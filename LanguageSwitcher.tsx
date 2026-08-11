"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import clsx from "clsx";

const labels: Record<string, string> = {
  ht: "Kreyòl",
  fr: "Français",
  en: "English",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav aria-label="Language" className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          aria-current={loc === locale ? "true" : undefined}
          onClick={() => router.replace(pathname, { locale: loc })}
          className={clsx(
            "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
            loc === locale
              ? "bg-blue-700 text-paper-50"
              : "text-blue-700 hover:bg-blue-700/10"
          )}
        >
          {labels[loc]}
        </button>
      ))}
    </nav>
  );
}
