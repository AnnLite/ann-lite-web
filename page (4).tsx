import { setRequestLocale, getTranslations } from "next-intl/server";
import { DonationForm } from "@/components/donation/DonationForm";

export const metadata = { title: "Donate with crypto" };

export default async function DonateCryptoPage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("donate");

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-display text-2xl font-semibold text-blue-700">{t("byCrypto")}</h1>
      <DonationForm method="cusd" />
      <p className="mt-4 text-sm text-ink-900/60">{t("transparencyNote")}</p>
    </div>
  );
}
