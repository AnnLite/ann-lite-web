import { setRequestLocale } from "next-intl/server";

export const metadata = { title: "Privacy" };

const content: Record<string, { h1: string; body: string[]; notice: string }> = {
  ht: {
    h1: "Konfidansyalite",
    body: [
      "Ann Lite kolekte sèlman done ki nesesè pou fè platfòm nan mache: kont itilizatè, done don (san detay peman sansib), ak jounal sekirite.",
      "Nou pa janm pibliye non oswa done pèsonèl timoun vilnerab oswa moun vilnerab yo sipòte yo.",
      "Don kripto yo transparan sou blockchain la, men adrès wallet pa otomatikman idantifye w kòm yon moun; nou pa pibliye enfòmasyon KYC piblikman.",
    ],
    notice:
      "AVÈTISMAN: Paj sa a se yon modèl teknik/operasyonèl. Li dwe verifye pa yon avoka anvan li antre an vigè legalman.",
  },
  fr: {
    h1: "Confidentialité",
    body: [
      "Ann Lite ne collecte que les données nécessaires au fonctionnement de la plateforme : comptes utilisateurs, données de don (sans détails de paiement sensibles) et journaux de sécurité.",
      "Nous ne publions jamais les noms ou données personnelles des enfants vulnérables ou des personnes soutenues.",
      "Les dons en cryptomonnaie sont transparents sur la blockchain, mais une adresse de portefeuille ne vous identifie pas automatiquement ; nous ne publions pas d'informations KYC publiquement.",
    ],
    notice:
      "AVERTISSEMENT : cette page est un modèle technique/opérationnel. Elle doit être vérifiée par un avocat avant d'entrer en vigueur légalement.",
  },
  en: {
    h1: "Privacy",
    body: [
      "Ann Lite only collects data necessary to operate the platform: user accounts, donation data (without sensitive payment details), and security logs.",
      "We never publish the names or personal data of vulnerable children or the people we support.",
      "Crypto donations are transparent on-chain, but a wallet address does not automatically identify you; we do not publicly publish KYC information.",
    ],
    notice:
      "NOTICE: this page is an operational/technical draft. It must be reviewed by a lawyer before taking legal effect.",
  },
};

export default async function PrivacyPage({
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
