import { defineRouting } from "next-intl/routing";

/**
 * Locales supported by Ann Lite.
 * ht = Haitian Creole (default), fr = French, en = English.
 */
export const routing = defineRouting({
  locales: ["ht", "fr", "en"],
  defaultLocale: "ht",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
