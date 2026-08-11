import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Contact form submission endpoint. Rate-limited by ann-lite-api in
 * production (see docs/CONTRACTS.md); here we validate shape and forward.
 * No message content is ever written to server logs (no PII in logs).
 */
const bodySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  // Honeypot field — real users never fill this in.
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "invalid_request", message: "Invalid contact form submission." } },
      { status: 400 }
    );
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return NextResponse.json(
      { error: { code: "backend_unavailable", message: "Contact service not yet deployed." } },
      { status: 503 }
    );
  }

  try {
    const upstream = await fetch(`${apiUrl}/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      }),
    });
    if (!upstream.ok) {
      return NextResponse.json(
        { error: { code: "upstream_error", message: "Could not submit message." } },
        { status: 502 }
      );
    }
    return NextResponse.json({ data: { submitted: true }, error: null });
  } catch {
    return NextResponse.json(
      { error: { code: "network_error", message: "Could not reach the server." } },
      { status: 502 }
    );
  }
}
