import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SERVICES } from "@/lib/services-data";
import { GUIDES } from "@/lib/guides-data";
import { POSTS } from "@/lib/blog-data";

const SITE_URL = "https://syntaxstudio.no";

type Route = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
  /** If set, the route only exists in these locales. Defaults to all locales. */
  locales?: readonly string[];
};

const ROUTES: Route[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  ...SERVICES.map((s): Route => ({
    path: `/services/${s.slug}`,
    priority: 0.85,
    changeFrequency: "monthly",
  })),
  ...GUIDES.map((g): Route => ({
    path: `/guides/${g.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  })),
  { path: "/blog", priority: 0.8, changeFrequency: "weekly", locales: ["no"] },
  ...POSTS.map((p): Route => ({
    path: `/blog/${p.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
    locales: ["no"],
  })),
  { path: "/book", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about-us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work/jonk", priority: 0.6, changeFrequency: "monthly" },
  { path: "/work/fcr", priority: 0.6, changeFrequency: "monthly" },
  { path: "/work/snatched", priority: 0.6, changeFrequency: "monthly" },
];

const localePrefix = (locale: string) =>
  locale === routing.defaultLocale ? "" : `/${locale}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap(({ path, priority, changeFrequency, locales }) => {
    const activeLocales = locales ?? routing.locales;

    const languages: Record<string, string> = Object.fromEntries(
      activeLocales.map((locale) => [
        locale,
        `${SITE_URL}${localePrefix(locale)}${path}`,
      ])
    );
    const defaultLocale = activeLocales.includes(routing.defaultLocale)
      ? routing.defaultLocale
      : activeLocales[0];
    languages["x-default"] = `${SITE_URL}${localePrefix(defaultLocale)}${path}`;

    return activeLocales.map((locale) => ({
      url: `${SITE_URL}${localePrefix(locale)}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
