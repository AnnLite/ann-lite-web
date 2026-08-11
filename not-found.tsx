import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("errors");
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-blue-700">404</h1>
      <p className="mt-4 text-ink-900/80">{t("notFound")}</p>
      <ButtonLink href="/" variant="primary" className="mt-8">
        Retounen / Retour / Home
      </ButtonLink>
    </div>
  );
}
