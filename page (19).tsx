import { setRequestLocale, getTranslations } from "next-intl/server";

export const metadata = { title: "About" };

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta");

  const copy: Record<string, { h1: string; body: string[] }> = {
    ht: {
      h1: "Konsènan " + "Ann Lite",
      body: [
        "Ann Lite se yon platfòm kretyen ki fèt pou ede moun devlope lavi espirityèl yo atravè lapriyè, lekti Bib la, refleksyon ak edikasyon kretyen.",
        "Ann Lite founde pa Berline Britus, ki wè platfòm sa a kòm yon fason pou prepare nanm moun pou Wayòm Syèl la, pandan y ap sèvi kominote ki defavorize yo ansanm.",
        "Nou pa reprezante okenn legliz an patikilye. Nou envite chak moun ki itilize platfòm nan pou rete konekte ak legliz lokal yo ak kominote lafwa yo.",
      ],
    },
    fr: {
      h1: "À propos d'Ann Lite",
      body: [
        "Ann Lite est une plateforme chrétienne conçue pour aider les gens à développer leur vie spirituelle à travers la prière, la lecture de la Bible, la réflexion et l'éducation chrétienne.",
        "Ann Lite a été fondée par Berline Britus, qui voit cette plateforme comme un moyen de préparer les âmes pour le Royaume des Cieux, tout en servant ensemble les communautés défavorisées.",
        "Nous ne représentons aucune église en particulier. Nous invitons chaque utilisateur à rester connecté à son église locale et à sa communauté de foi.",
      ],
    },
    en: {
      h1: "About Ann Lite",
      body: [
        "Ann Lite is a Christian platform built to help people grow in their spiritual life through prayer, Bible reading, reflection, and Christian education.",
        "Ann Lite was founded by Berline Britus, who sees the platform as a way to prepare souls for the Kingdom of Heaven while serving underserved communities together.",
        "We do not represent any single church. We encourage every user to stay connected to their local church and faith community.",
      ],
    },
  };

  const c = copy[locale];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-blue-700">{c.h1}</h1>
      <div className="mt-6 space-y-4 text-ink-900/90">
        {c.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <p className="mt-8 text-sm text-ink-900/60">{t("tagline")}</p>
    </div>
  );
}
