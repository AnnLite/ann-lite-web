import { setRequestLocale } from "next-intl/server";
import { apiClient, ApiUnavailableError } from "@/lib/api-client";

export default async function BibleChapterPage({
  params,
}: {
  params: Promise<{
    locale: "ht" | "fr" | "en";
    translation: string;
    book: string;
    chapter: string;
  }>;
}) {
  const { locale, translation, book, chapter } = await params;
  setRequestLocale(locale);
  const chapterNumber = Number(chapter);

  try {
    const data = await apiClient.getBibleChapter(translation, book, chapterNumber);
    return (
      <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-blue-700">
          {data.book} {data.chapter}
        </h1>
        <ol className="mt-6 space-y-3 text-lg leading-relaxed text-ink-900/90">
          {data.verses.map((verse) => (
            <li key={verse.number} className="flex gap-3">
              <span className="text-sm font-semibold text-gold-600">{verse.number}</span>
              <span>{verse.text}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-xs text-ink-900/50">
          © {data.copyright.owner} — {data.copyright.license} ({data.copyright.permissionStatus})
        </p>
      </article>
    );
  } catch (error) {
    if (error instanceof ApiUnavailableError) {
      return (
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <h1 className="font-display text-2xl font-semibold text-blue-700">
            {book} {chapter}
          </h1>
          <p className="mt-4 text-ink-900/70">
            The Bible reader connects to ann-lite-api and ann-lite-content, neither of which is
            deployed in this release yet. No Bible text is bundled directly into the frontend,
            since every translation requires a verified copyright/license record first — see
            docs/CONTRACTS.md and TODO.md.
          </p>
        </div>
      );
    }
    throw error;
  }
}
