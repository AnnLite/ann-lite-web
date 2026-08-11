import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { apiClient, ApiUnavailableError } from "@/lib/api-client";
import type { Prayer, Reflection } from "@/types/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  let prayers: Prayer[] = [];
  let reflections: Reflection[] = [];
  let backendAvailable = true;
  try {
    [prayers, reflections] = await Promise.all([
      apiClient.getPrayers(),
      apiClient.getReflections(),
    ]);
  } catch (error) {
    if (error instanceof ApiUnavailableError) {
      backendAvailable = false;
    } else {
      throw error;
    }
  }

  return (
    <>
      <section className="border-b border-line-200 bg-gradient-to-b from-blue-700 to-ink-900 text-paper-50">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h1 className="text-balance font-display text-4xl font-semibold sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-paper-100/90">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/prayers" variant="secondary">
              {t("ctaPrimary")}
            </ButtonLink>
            <ButtonLink href="/donate" variant="ghost" className="!border-paper-50/40 !text-paper-50">
              {t("ctaSecondary")}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-blue-700">
          {t("sectionPrayers")}
        </h2>
        {!backendAvailable && (
          <p className="mt-3 rounded-lg bg-paper-100 p-4 text-sm text-ink-900/70">
            {await (await getTranslations("errors"))("backendUnavailable")}
          </p>
        )}
        {backendAvailable && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {prayers.slice(0, 3).map((prayer) => (
              <Card key={prayer.id}>
                <h3 className="font-display text-lg font-semibold">{prayer.title[locale]}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-ink-900/80">{prayer.body[locale]}</p>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-blue-700">
          {t("sectionReflections")}
        </h2>
        {backendAvailable && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reflections.slice(0, 3).map((reflection) => (
              <Card key={reflection.id}>
                <h3 className="font-display text-lg font-semibold">
                  {reflection.title[locale]}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-ink-900/80">
                  {reflection.excerpt[locale]}
                </p>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-line-200 bg-paper-100">
        <p className="mx-auto max-w-3xl px-4 py-8 text-center text-sm italic text-ink-900/70 sm:px-6">
          {t("disclaimer")}
        </p>
      </section>
    </>
  );
}
