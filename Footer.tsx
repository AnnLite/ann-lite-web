import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tMeta = useTranslations("meta");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-200 bg-paper-100">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-ink-900 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-base font-semibold text-blue-700">{tMeta("siteName")}</p>
            <p className="mt-1 max-w-xs text-ink-900/80">{tMeta("tagline")}</p>
          </div>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-blue-700">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-blue-700">
              {t("terms")}
            </Link>
            <Link href="/accessibility" className="hover:text-blue-700">
              {t("accessibility")}
            </Link>
            <Link href="/contact" className="hover:text-blue-700">
              Contact
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-ink-900/60">
          © {year} {tMeta("siteName")}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
