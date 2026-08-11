import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

describe("apiClient", () => {
  const originalEnv = process.env.NEXT_PUBLIC_API_URL;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_API_URL = originalEnv;
    vi.unstubAllGlobals();
  });

  it("throws ApiUnavailableError when NEXT_PUBLIC_API_URL is not configured", async () => {
    delete process.env.NEXT_PUBLIC_API_URL;
    const { apiClient, ApiUnavailableError } = await import("@/lib/api-client");

    await expect(apiClient.getPrayers()).rejects.toBeInstanceOf(ApiUnavailableError);
  });

  it("throws ApiUnavailableError on a non-OK HTTP response instead of throwing raw", async () => {
    process.env.NEXT_PUBLIC_API_URL = "https://api.example.test";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) })
    );
    const { apiClient, ApiUnavailableError } = await import("@/lib/api-client");

    await expect(apiClient.getPrayers()).rejects.toBeInstanceOf(ApiUnavailableError);
  });

  it("returns data when the envelope is successful", async () => {
    process.env.NEXT_PUBLIC_API_URL = "https://api.example.test";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: [{ id: "1" }], error: null }),
      })
    );
    const { apiClient } = await import("@/lib/api-client");

    await expect(apiClient.getPrayers()).resolves.toEqual([{ id: "1" }]);
  });
});
