import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations } from "next-intl/server";
import { ArrowRight, TrendingUp, Camera, Video, Globe, Megaphone } from "lucide-react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProposalSection from "@/components/proposal-section";
import WorkIntroSection from "@/components/project-showcase-2";
import ServicesFaq from "@/components/services-faq";
import { Link } from "@/i18n/navigation";
import { SERVICES, type Locale } from "@/lib/services-data";

const FAQ_KEYS = ["timeline", "cost", "changes", "support", "tech"] as const;

const ICON_MAP = {
  TrendingUp,
  Camera,
  Video,
  Globe,
  Megaphone,
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.services" });
  const path = locale === "no" ? "/services" : "/en/services";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { no: "/services", en: "/en/services", "x-default": "/services" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: path,
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = locale === "no" ? "no" : "en";
  const t = await getTranslations("Services");
  const faqT = await getTranslations("ServicesPage.faq");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_KEYS.map((key) => ({
      "@type": "Question",
      name: faqT(`items.${key}.q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: faqT(`items.${key}.a`),
      },
    })),
  };

  return (
    <>
      <Header />
      <Script
        id="ld-services-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main id="main-content">
        <section className="container mx-auto max-w-3xl px-4 pt-28 pb-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </section>

        {/* Service detail cards — flex-wrap so 5 items center the orphan */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap justify-center gap-6">
            {SERVICES.map((service) => {
              const Icon = ICON_MAP[service.icon];
              const c = service.content[loc];
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative rounded-2xl border border-white/10 bg-card/30 p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h2 className="text-xl font-bold tracking-tight mb-2">
                    {c.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {c.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                    {loc === "no" ? "Les mer" : "Read more"}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <WorkIntroSection />
        <ServicesFaq />
        <ProposalSection />
      </main>
      <Footer />
    </>
  );
}
