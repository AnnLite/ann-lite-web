import "server-only";
import type {
  ApiEnvelope,
  BibleChapter,
  CharityProject,
  DonationIntentRequest,
  DonationIntentResponse,
  Prayer,
  Reflection,
  TransparencySummary,
} from "@/types/content";

/**
 * Server-only client for ann-lite-api.
 *
 * IMPORTANT: this file must never be imported from a "use client" component.
 * The `server-only` import above makes that a build-time error, not just a
 * convention, per the brief's requirement that the frontend hold no secrets
 * and never call payment/blockchain infrastructure directly.
 *
 * ann-lite-api does not exist yet in this release. Every call below fails
 * fast with a typed, user-safe error instead of throwing an unhandled
 * exception or silently returning fake data. See docs/CONTRACTS.md and
 * TODO.md.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiUnavailableError extends Error {
  constructor(detail: string) {
    super(detail);
    this.name = "ApiUnavailableError";
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiUnavailableError(
      `NEXT_PUBLIC_API_URL is not configured; cannot reach ${path}. ` +
        "ann-lite-api has not been deployed yet in this release — see TODO.md."
    );
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
      // Content pages can be cached briefly; donation/transparency calls
      // override this with { cache: "no-store" } at the call site.
      next: { revalidate: 60 },
    });
  } catch {
    throw new ApiUnavailableError(`Network error reaching ann-lite-api at ${path}.`);
  }

  if (!response.ok) {
    throw new ApiUnavailableError(`ann-lite-api returned HTTP ${response.status} for ${path}.`);
  }

  const envelope = (await response.json()) as ApiEnvelope<T>;
  if (envelope.error || envelope.data === null) {
    throw new ApiUnavailableError(envelope.error?.message ?? "Unknown API error.");
  }
  return envelope.data;
}

export const apiClient = {
  getPrayers: () => apiFetch<Prayer[]>("/v1/prayers"),
  getPrayer: (slug: string) => apiFetch<Prayer>(`/v1/prayers/${encodeURIComponent(slug)}`),
  getReflections: () => apiFetch<Reflection[]>("/v1/reflections"),
  getReflection: (slug: string) =>
    apiFetch<Reflection>(`/v1/reflections/${encodeURIComponent(slug)}`),
  getBibleChapter: (translation: string, book: string, chapter: number) =>
    apiFetch<BibleChapter>(
      `/v1/bible/${encodeURIComponent(translation)}/${encodeURIComponent(book)}/${chapter}`
    ),
  getProjects: () => apiFetch<CharityProject[]>("/v1/projects"),
  getProject: (slug: string) => apiFetch<CharityProject>(`/v1/projects/${encodeURIComponent(slug)}`),
  getTransparencySummary: () =>
    apiFetch<TransparencySummary>("/v1/transparency/summary", { cache: "no-store" as never }),
  createDonationIntent: (body: DonationIntentRequest) =>
    apiFetch<DonationIntentResponse>("/v1/donations/intent", {
      method: "POST",
      body: JSON.stringify(body),
      cache: "no-store" as never,
    }),
};
