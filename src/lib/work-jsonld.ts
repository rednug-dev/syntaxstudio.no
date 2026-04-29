const SITE_URL = "https://syntaxstudio.no";

type WorkSchemaInput = {
  slug: string;
  title: string;
  description: string;
  image: string;
  locale: string;
  /** ISO date string for datePublished. Defaults to a stable past date. */
  datePublished?: string;
};

export function buildWorkJsonLd({
  slug,
  title,
  description,
  image,
  locale,
  datePublished = "2025-01-01",
}: WorkSchemaInput) {
  const prefix = locale === "no" ? "" : `/${locale}`;
  const url = `${SITE_URL}${prefix}/work/${slug}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "no" ? "Hjem" : "Home",
        item: `${SITE_URL}${prefix}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "no" ? "Tjenester" : "Services",
        item: `${SITE_URL}${prefix}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url,
      },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [imageUrl],
    url,
    inLanguage: locale,
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: "Syntax Studio",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Syntax Studio",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/syntax-i.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return { breadcrumb, article };
}
