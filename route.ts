import { NextResponse } from "next/server";
import { z } from "zod";
import { apiClient, ApiUnavailableError } from "@/lib/api-client";

/**
 * Proxies donation-intent creation to ann-lite-api. This route exists so the
 * browser never talks to the backend (or holds a backend URL/secret)
 * directly, and so we can validate input server-side before it reaches the
 * payment/crypto layer.
 */
const bodySchema = z.object({
  method: z.enum(["card", "celo", "cusd"]),
  amountUsd: z.number().positive().max(1_000_000),
  projectId: z.string().optional(),
  donorEmail: z.string().email().optional(),
  anonymous: z.boolean(),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "invalid_request", message: "Invalid donation request." } },
      { status: 400 }
    );
  }

  try {
    const intent = await apiClient.createDonationIntent(parsed.data);
    return NextResponse.json(intent);
  } catch (error) {
    if (error instanceof ApiUnavailableError) {
      return NextResponse.json(
        { error: { code: "backend_unavailable", message: error.message } },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: { code: "internal_error", message: "Unexpected error." } },
      { status: 500 }
    );
  }
}
