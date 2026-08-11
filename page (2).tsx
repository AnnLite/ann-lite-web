import { setRequestLocale, getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Donate" };

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("donate");

  const options: Array<[string, string]> = [
    ["/donate/card", t("byCard")],
    ["/donate/crypto", t("byCrypto")],
    ["/donate/celo", t("byCelo")],
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-blue-700">{t("title")}</h1>
      <p className="mt-4 text-ink-900/90">{t("intro")}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {options.map(([href, label]) => (
          <Card key={href} className="flex flex-col items-start gap-4">
            <span className="font-display text-lg font-semibold">{label}</span>
            <ButtonLink href={href} variant="secondary" className="w-full">
              {label}
            </ButtonLink>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-sm text-ink-900/60">{t("transparencyNote")}</p>
    </div>
  );
}
