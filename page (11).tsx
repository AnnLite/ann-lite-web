import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = { title: "Contact" };

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-blue-700">{t("contact")}</h1>
      <ContactForm />
    </div>
  );
}
