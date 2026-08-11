import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");

  const links: Array<[string, string]> = [
    ["/bible/kreyol-fasil/jan/1", t("bible")],
    ["/prayers", t("prayers")],
    ["/reflections", t("reflections")],
    ["/projects", t("projects")],
    ["/transparency", t("transparency")],
    ["/about", t("about")],
  ];

  return (
    <header className="border-b border-line-200 bg-paper-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-blue-700">
          <span aria-hidden className="text-gold-500">
            ✝
          </span>
          {tMeta("siteName")}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 text-sm font-medium text-ink-900 md:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-blue-700">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/donate"
            className="rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-gold-400"
          >
            {t("donate")}
          </Link>
        </div>
      </div>
    </header>
  );
}
