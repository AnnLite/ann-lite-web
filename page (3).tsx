import { setRequestLocale, getTranslations } from "next-intl/server";
import { DonationForm } from "@/components/donation/DonationForm";

export const metadata = { title: "Donate by card" };

export default async function DonateCardPage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("donate");

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-display text-2xl font-semibold text-blue-700">{t("byCard")}</h1>
      <DonationForm method="card" />
    </div>
  );
}
