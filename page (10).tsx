import { setRequestLocale, getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { apiClient, ApiUnavailableError } from "@/lib/api-client";
import type { TransparencySummary } from "@/types/content";

export const metadata = { title: "Transparency" };

export default async function TransparencyPage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("transparency");
  const tErr = await getTranslations("errors");

  let summary: TransparencySummary | null = null;
  try {
    summary = await apiClient.getTransparencySummary();
  } catch (error) {
    if (!(error instanceof ApiUnavailableError)) throw error;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-blue-700">{t("title")}</h1>
      <p className="mt-4 text-ink-900/90">{t("intro")}</p>

      {!summary ? (
        <p className="mt-8 rounded-lg bg-paper-100 p-4 text-sm text-ink-900/70">
          {tErr("backendUnavailable")}
        </p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Card>
              <p className="text-xs uppercase tracking-wide text-ink-900/50">Total (USD)</p>
              <p className="mt-1 font-display text-2xl font-semibold">
                ${summary.totalDonationsUsd.toLocaleString()}
              </p>
            </Card>
            <Card>
              <p className="text-xs uppercase tracking-wide text-ink-900/50">
                Verified on-chain
              </p>
              <p className="mt-1 font-display text-2xl font-semibold">
                ${summary.totalDonationsVerifiedOnChain.toLocaleString()}
              </p>
            </Card>
            <Card>
              <p className="text-xs uppercase tracking-wide text-ink-900/50">Active projects</p>
              <p className="mt-1 font-display text-2xl font-semibold">
                {summary.activeProjects}
              </p>
            </Card>
          </div>

          <h2 className="mt-10 font-display text-xl font-semibold text-blue-700">
            Recent on-chain transactions
          </h2>
          <ul className="mt-4 divide-y divide-line-200">
            {summary.recentTransactions.map((tx) => (
              <li key={tx.transactionHash} className="flex items-center justify-between py-3">
                <span className="font-mono text-sm text-ink-900/80">
                  {tx.transactionHash.slice(0, 10)}…
                </span>
                <span className="text-sm">
                  {tx.amount} {tx.token}
                </span>
                <a
                  href={tx.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-700 underline"
                >
                  Explorer
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
