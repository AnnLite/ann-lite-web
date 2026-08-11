"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import type { DonationMethod } from "@/types/content";

/**
 * This form never marks a donation as successful on its own. It only ever
 * creates a *donation intent* by calling POST /api/donations/intent (which
 * proxies to ann-lite-api). Card intents redirect to the payment provider's
 * hosted session; crypto intents display an address/memo for the donor to
 * send funds to. Final confirmation always comes from a verified webhook
 * or on-chain confirmation on the backend — never from this component.
 */
export function DonationForm({ method }: { method: DonationMethod }) {
  const t = useTranslations("donate");
  const tErr = useTranslations("errors");
  const [amount, setAmount] = useState<number>(25);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "redirected">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/donations/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, amountUsd: amount, anonymous: false }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = (await response.json()) as {
        paymentSessionUrl?: string;
        cryptoAddress?: string;
        referenceMemo?: string;
      };

      if (result.paymentSessionUrl) {
        window.location.assign(result.paymentSessionUrl);
        setStatus("redirected");
        return;
      }

      setStatus("idle");
      if (result.cryptoAddress) {
        setErrorMessage(null);
      }
    } catch {
      setStatus("error");
      setErrorMessage(tErr("backendUnavailable"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
      <label className="block text-sm font-medium text-ink-900" htmlFor={`amount-${method}`}>
        USD
      </label>
      <input
        id={`amount-${method}`}
        name="amount"
        type="number"
        min={1}
        step={1}
        required
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full rounded-lg border border-line-200 bg-white px-4 py-3 text-lg focus-visible:outline-none"
      />

      <Button type="submit" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "…" : t("byCard")}
      </Button>

      <div role="status" aria-live="polite">
        {status === "error" && errorMessage && (
          <p className="rounded-lg bg-paper-100 p-3 text-sm text-ink-900/80">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}
