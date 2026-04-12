import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  GUIDES,
  getGuideBySlug,
  type Block,
  type Locale,
} from "@/lib/guides-data";

const SITE_URL = "https://syntaxstudio.no";

export function generateStaticParams() {
  return GUIDES.flatMap((g) =>
    routing.locales.map((locale) => ({ locale, slug: g.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const meta = guide.meta[locale as Locale] ?? guide.meta.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/guides/${slug}`,
      languages: {
        en: `/en/guides/${slug}`,
        no: `/no/guides/${slug}`,
        "x-default": `/en/guides/${slug}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${locale}/guides/${slug}`,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
    },
  };
}

function renderBlock(block: Block, idx: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={idx} className="text-lg text-foreground/90 leading-relaxed mb-5">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2
          key={idx}
          id={block.id}
          className="text-3xl sm:text-4xl font-bold tracking-tight mt-16 mb-6"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={idx} className="text-xl sm:text-2xl font-semibold mt-10 mb-4">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul key={idx} className="space-y-3 mb-6 pl-1">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-lg text-foreground/85 leading-relaxed"
            >
              <span className="mt-3 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={idx} className="space-y-4 mb-6 list-decimal pl-6 marker:text-primary marker:font-semibold">
          {block.items.map((item, i) => (
            <li key={i} className="text-lg text-foreground/85 leading-relaxed pl-2">
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div
          key={idx}
          className="my-8 rounded-2xl border border-primary/20 bg-primary/5 p-6"
        >
          {block.title && (
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
              {block.title}
            </h4>
          )}
          <p className="text-base text-foreground/90 leading-relaxed">
            {block.body}
          </p>
        </div>
      );
    case "table":
      return (
        <div key={idx} className="my-8 overflow-x-auto">
          <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
            <thead className="bg-card/40">
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left p-3 font-semibold border-b border-white/10">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="p-3 text-muted-foreground">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const loc: Locale = (locale as Locale) in guide.content ? (locale as Locale) : "en";
  const c = guide.content[loc];
  const meta = guide.meta[loc];

  // JSON-LD: Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: meta.description,
    url: `${SITE_URL}/${loc}/guides/${slug}`,
    inLanguage: loc,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
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
      "@id": `${SITE_URL}/${loc}/guides/${slug}`,
    },
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: loc === "no" ? "Hjem" : "Home",
        item: `${SITE_URL}/${loc}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: loc === "no" ? "Guider" : "Guides",
        item: `${SITE_URL}/${loc}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: c.title,
        item: `${SITE_URL}/${loc}/guides/${slug}`,
      },
    ],
  };

  // JSON-LD: FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Header />
      <Script
        id={`ld-guide-article-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id={`ld-guide-breadcrumb-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id={`ld-guide-faq-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main id="main-content" className="container mx-auto max-w-3xl px-4 py-20 sm:py-28">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-foreground">
                {loc === "no" ? "Hjem" : "Home"}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{loc === "no" ? "Guider" : "Guides"}</li>
            <li>/</li>
            <li className="text-foreground">{c.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            {loc === "no" ? "Guide" : "Guide"}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {c.title}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
            {c.lead}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            {loc === "no" ? "Sist oppdatert" : "Last updated"}:{" "}
            <time dateTime={guide.updatedAt}>
              {new Date(guide.updatedAt).toLocaleDateString(loc === "no" ? "nb-NO" : "en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
        </header>

        {/* Body */}
        <article className="prose-lg">
          {c.blocks.map((block, idx) => renderBlock(block, idx))}
        </article>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            {loc === "no" ? "Ofte stilte spørsmål" : "Frequently asked questions"}
          </h2>
          <div className="space-y-8">
            {c.faq.map((item, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-2">{item.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-20 rounded-2xl border border-white/10 bg-card/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            {c.cta.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            {c.cta.body}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/book">
                {c.cta.primary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={guide.serviceLink}>{c.cta.secondary}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
