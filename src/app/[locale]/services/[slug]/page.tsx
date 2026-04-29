import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ArrowRight, Check, TrendingUp, Camera, Video, Globe, Megaphone } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  SERVICES,
  getServiceBySlug,
  type Locale,
} from "@/lib/services-data";

const ICON_MAP = {
  TrendingUp,
  Camera,
  Video,
  Globe,
  Megaphone,
} as const;

const SITE_URL = "https://syntaxstudio.no";

export function generateStaticParams() {
  return SERVICES.flatMap((service) =>
    routing.locales.map((locale) => ({ locale, slug: service.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const meta = service.meta[locale as Locale] ?? service.meta.en;
  const path = locale === "no" ? `/services/${slug}` : `/en/services/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: {
        no: `/services/${slug}`,
        en: `/en/services/${slug}`,
        "x-default": `/services/${slug}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const loc = (locale as Locale) in service.content ? (locale as Locale) : "en";
  const c = service.content[loc];
  const meta = service.meta[loc];

  // Schema.org Service
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: meta.title,
    name: c.title,
    description: meta.description,
    provider: {
      "@type": "Organization",
      name: "Syntax Studio",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Norway" },
    url: `${SITE_URL}/${loc}/services/${slug}`,
    ...(service.offer && {
      offers: {
        "@type": "Offer",
        priceCurrency: service.offer.priceCurrency,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: service.offer.priceCurrency,
          price: service.offer.priceRange,
        },
      },
    }),
  };

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
        name: loc === "no" ? "Tjenester" : "Services",
        item: `${SITE_URL}/${loc}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.title,
        item: `${SITE_URL}/${loc}/services/${slug}`,
      },
    ],
  };

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
        id={`ld-service-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id={`ld-service-breadcrumb-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id={`ld-service-faq-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main id="main-content" className="container mx-auto max-w-4xl px-4 py-20 sm:py-28">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground">
                {loc === "no" ? "Hjem" : "Home"}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/services" className="hover:text-foreground">
                {loc === "no" ? "Tjenester" : "Services"}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{meta.title}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {c.title}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            {c.tagline}
          </p>
          <p className="mt-6 text-base text-muted-foreground/90 leading-relaxed max-w-2xl">
            {c.intro}
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/book">
                {loc === "no" ? "Book et møte" : "Book a meeting"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* What we do */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            {loc === "no" ? "Hva vi gjør" : "What we do"}
          </h2>
          <ul className="space-y-3">
            {c.whatWeDo.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Edge / differentiator */}
        <section className="mb-16 rounded-2xl border border-white/10 bg-card/30 p-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            {c.edge.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{c.edge.body}</p>
        </section>

        {/* Process — flex-wrap so odd counts (3) center the orphan */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            {loc === "no" ? "Slik jobber vi" : "How we work"}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {c.process.map((step, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-card/20 p-6 w-full sm:w-[calc(50%-0.75rem)]"
              >
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Case link (photo / video pages) */}
        {c.caseLink && (
          <section className="mb-16 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href={c.caseLink.href}>
                {c.caseLink.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        )}

        {/* Who it's for */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            {loc === "no" ? "Hvem det passer for" : "Who it's for"}
          </h2>
          <ul className="space-y-3">
            {c.whoFor.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pricing (if any) */}
        {c.pricing && (
          <section className="mb-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {loc === "no" ? "Pris" : "Pricing"}
            </h2>
            <p className="text-xl font-semibold">{c.pricing}</p>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            {loc === "no" ? "Ofte stilte spørsmål" : "Frequently asked questions"}
          </h2>
          <div className="space-y-6">
            {c.faq.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related services */}
        {service.related && service.related.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
              {loc === "no" ? "Relaterte tjenester" : "Related services"}
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {service.related
                .map((slug) => getServiceBySlug(slug))
                .filter((s): s is NonNullable<typeof s> => Boolean(s))
                .map((rel) => {
                  const RelIcon = ICON_MAP[rel.icon];
                  const rc = rel.content[loc];
                  return (
                    <Link
                      key={rel.slug}
                      href={`/services/${rel.slug}`}
                      className="group flex-1 min-w-[260px] max-w-sm rounded-2xl border border-white/10 bg-card/30 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                    >
                      <RelIcon className="h-6 w-6 text-primary mb-3" />
                      <h3 className="font-semibold mb-1">{rc.title}</h3>
                      <p className="text-sm text-muted-foreground leading-snug mb-3">
                        {rc.tagline}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        {loc === "no" ? "Les mer" : "Read more"}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  );
                })}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="rounded-2xl border border-white/10 bg-card/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            {c.cta}
          </h2>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/book">
                {loc === "no" ? "Book et møte" : "Book a meeting"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">
                {loc === "no" ? "Se alle tjenester" : "All services"}
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
