import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { apiClient, ApiUnavailableError } from "@/lib/api-client";
import type { Reflection } from "@/types/content";

export const metadata = { title: "Reflections" };

export default async function ReflectionsPage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const tErr = await getTranslations("errors");

  let reflections: Reflection[] = [];
  let available = true;
  try {
    reflections = await apiClient.getReflections();
  } catch (error) {
    if (error instanceof ApiUnavailableError) available = false;
    else throw error;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-blue-700">{t("reflections")}</h1>
      {!available && (
        <p className="mt-4 rounded-lg bg-paper-100 p-4 text-sm text-ink-900/70">
          {tErr("backendUnavailable")}
        </p>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {reflections.map((reflection) => (
          <Link key={reflection.id} href={`/reflections/${reflection.slug}`}>
            <Card>
              <h2 className="font-display text-lg font-semibold">
                {reflection.title[locale]}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-ink-900/80">
                {reflection.excerpt[locale]}
              </p>
              <p className="mt-3 text-xs uppercase tracking-wide text-ink-900/50">
                {reflection.author}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
