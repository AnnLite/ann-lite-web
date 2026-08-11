import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const staticPaths = [
  "",
  "/about",
  "/prayers",
  "/reflections",
  "/donate",
  "/donate/card",
  "/donate/crypto",
  "/donate/celo",
  "/impact",
  "/transparency",
  "/projects",
  "/search",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.annlite.org";
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
      });
    }
  }
  return entries;
}
