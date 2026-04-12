import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SERVICES } from "@/lib/services-data";
import { GUIDES } from "@/lib/guides-data";

const SITE_URL = "https://syntaxstudio.no";

const ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  ...SERVICES.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  })),
  ...GUIDES.map((g) => ({
    path: `/guides/${g.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/book", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about-us", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/work/jonk", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/work/fcr", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/work/snatched", priority: 0.6, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => {
    const languages: Record<string, string> = Object.fromEntries(
      routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
    );
    languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${path}`;

    return {
      url: `${SITE_URL}/${routing.defaultLocale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    };
  });
}
