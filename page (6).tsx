import { setRequestLocale } from "next-intl/server";

export const metadata = { title: "Accessibility" };

const content: Record<string, { h1: string; body: string[] }> = {
  ht: {
    h1: "Aksesibilite",
    body: [
      "Ann Lite gen pou objektif respekte estanda WCAG 2.2 nivo AA: kontras koulè sifizan, navigasyon klavye konplè, done fokis vizib, ak tèks altènatif pou imaj.",
      "Si w jwenn yon pwoblèm aksesibilite, tanpri kontakte n atravè paj Kontakte nou an.",
    ],
  },
  fr: {
    h1: "Accessibilité",
    body: [
      "Ann Lite vise à respecter les normes WCAG 2.2 niveau AA : contraste de couleurs suffisant, navigation clavier complète, focus visible, et texte alternatif pour les images.",
      "Si vous rencontrez un problème d'accessibilité, veuillez nous contacter via la page Contact.",
    ],
  },
  en: {
    h1: "Accessibility",
    body: [
      "Ann Lite aims to meet WCAG 2.2 level AA standards: sufficient color contrast, full keyboard navigation, visible focus states, and alt text for images.",
      "If you encounter an accessibility issue, please reach us through the Contact page.",
    ],
  },
};

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale];
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-blue-700">{c.h1}</h1>
      <div className="mt-6 space-y-4 text-ink-900/90">
        {c.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </div>
  );
}
