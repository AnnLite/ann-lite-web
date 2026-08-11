import { setRequestLocale } from "next-intl/server";

export const metadata = { title: "Terms" };

const content: Record<string, { h1: string; body: string[]; notice: string }> = {
  ht: {
    h1: "Kondisyon itilizasyon",
    body: [
      "Lè w itilize Ann Lite, ou dakò pou w itilize platfòm nan yon fason ki respekte lòt itilizatè ak prensip kretyen respè yo.",
      "Ann Lite pa garanti okenn rezilta espirityèl, finansye, oswa mirak an echanj pou itilizasyon platfòm nan oswa yon don.",
      "Don yo, yon fwa yo konfime, jeneralman pa ranbousab, eksepte kote lalwa mande sa.",
    ],
    notice:
      "AVÈTISMAN: Paj sa a se yon modèl teknik/operasyonèl. Li dwe verifye pa yon avoka anvan li antre an vigè legalman.",
  },
  fr: {
    h1: "Conditions d'utilisation",
    body: [
      "En utilisant Ann Lite, vous acceptez d'utiliser la plateforme dans le respect des autres utilisateurs et des principes chrétiens de respect.",
      "Ann Lite ne garantit aucun résultat spirituel, financier ou miraculeux en échange de l'utilisation de la plateforme ou d'un don.",
      "Les dons, une fois confirmés, ne sont généralement pas remboursables, sauf lorsque la loi l'exige.",
    ],
    notice:
      "AVERTISSEMENT : cette page est un modèle technique/opérationnel. Elle doit être vérifiée par un avocat avant d'entrer en vigueur légalement.",
  },
  en: {
    h1: "Terms of use",
    body: [
      "By using Ann Lite, you agree to use the platform in a way that respects other users and Christian principles of respect.",
      "Ann Lite does not guarantee any spiritual, financial, or miraculous outcome in exchange for using the platform or making a donation.",
      "Donations, once confirmed, are generally non-refundable, except where required by law.",
    ],
    notice:
      "NOTICE: this page is an operational/technical draft. It must be reviewed by a lawyer before taking legal effect.",
  },
};

export default async function TermsPage({
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
      <p className="mt-8 rounded-lg bg-paper-100 p-4 text-sm font-medium text-ink-900/80">
        {c.notice}
      </p>
    </div>
  );
}
