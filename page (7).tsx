import { setRequestLocale, getTranslations } from "next-intl/server";

export const metadata = { title: "Search" };

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const tErr = await getTranslations("errors");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-blue-700">{t("search")}</h1>
      <form action="/search" className="mt-8 flex gap-2" role="search">
        <label htmlFor="q" className="sr-only">
          {t("search")}
        </label>
        <input
          id="q"
          name="q"
          type="search"
          className="flex-1 rounded-lg border border-line-200 bg-white px-4 py-3 focus-visible:outline-none"
          placeholder={t("search")}
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-paper-50"
        >
          {t("search")}
        </button>
      </form>
      <p className="mt-6 text-sm text-ink-900/70">{tErr("backendUnavailable")}</p>
    </div>
  );
}
