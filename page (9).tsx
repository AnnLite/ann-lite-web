import { setRequestLocale, getTranslations } from "next-intl/server";

export const metadata = { title: "Impact" };

export default async function ImpactPage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("impact");
  const tErr = await getTranslations("errors");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-blue-700">{t("title")}</h1>
      <p className="mt-4 text-ink-900/90">{t("intro")}</p>
      <p className="mt-8 rounded-lg bg-paper-100 p-4 text-sm text-ink-900/70">
        {tErr("backendUnavailable")}
      </p>
    </div>
  );
}
