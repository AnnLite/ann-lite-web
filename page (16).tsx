import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { apiClient, ApiUnavailableError } from "@/lib/api-client";

export default async function ReflectionDetailPage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en"; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  try {
    const reflection = await apiClient.getReflection(slug);
    return (
      <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-blue-700">
          {reflection.title[locale]}
        </h1>
        <p className="mt-2 text-sm uppercase tracking-wide text-ink-900/50">
          {reflection.author}
        </p>
        <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-ink-900/90">
          {reflection.body[locale]}
        </p>
      </article>
    );
  } catch (error) {
    if (error instanceof ApiUnavailableError) {
      return (
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <p className="text-ink-900/70">
            This reflection isn&apos;t available yet — ann-lite-api hasn&apos;t been deployed
            in this release.
          </p>
        </div>
      );
    }
    notFound();
  }
}
