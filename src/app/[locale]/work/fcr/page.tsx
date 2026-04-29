import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, ArrowLeft, ArrowRight, Swords, Flame, VolumeX, Quote } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildWorkJsonLd } from "@/lib/work-jsonld";
import Image from "next/image";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.workFcr" });
  const path = locale === "no" ? "/work/fcr" : "/en/work/fcr";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { no: "/work/fcr", en: "/en/work/fcr", "x-default": "/work/fcr" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: path,
      type: "article",
    },
  };
}

export default async function FCRWorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("About.WorkIntro.projects.fcr.page");
  const metaT = await getTranslations({ locale, namespace: "Meta.workFcr" });

  const { breadcrumb, article } = buildWorkJsonLd({
    slug: "fcr",
    title: metaT("title"),
    description: metaT("description"),
    image: "/showcase/bigpic.webp",
    locale,
  });

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Script
        id="ld-fcr-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Script
        id="ld-fcr-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <Header />
      <main id="main-content" className="flex-1 pb-24">
        {/* Top Navigation */}
        <div className="container mx-auto px-4 pt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {t("back")}
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center relative">
                <Image
                  src="/logos/FCRNM.svg"
                  alt="FCR"
                  fill
                  className="object-contain p-2 brightness-0 invert"
                />
              </div>
              <Badge
                variant="outline"
                className="uppercase tracking-[0.2em] text-[10px] py-1 px-3 border-primary/20 text-primary"
              >
                {t("badge")}
              </Badge>
            </div>

            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] italic font-headline">
              {t("title")}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {t("description")}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                <Swords className="h-4 w-4" /> MMA
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                <Video className="h-4 w-4" /> Promo
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                <Flame className="h-4 w-4" /> Tamerlan Akhmadov
              </div>
            </div>
          </div>
        </section>

        {/* Background Section */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4">
              {t("backgroundTitle")}
            </h2>
            <p className="text-xl text-foreground/90 leading-relaxed">
              {t("backgroundBody")}
            </p>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-24 bg-muted/30 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tighter mb-4 italic uppercase">
                {t("videoTitle")}
              </h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-xl">
                {t("videoDesc")}
              </p>

              {/* Video placeholder — replace src when video is added */}
              <div className="aspect-video rounded-[2rem] bg-card/40 border border-white/5 shadow-xl overflow-hidden flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Video className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
                    Video kommer snart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section className="container mx-auto px-4 pt-12 pb-24">
          <div className="rounded-[3rem] bg-card/40 border border-white/5 p-12 pr-16 lg:p-20 lg:pr-32 shadow-2xl relative overflow-hidden">
            <div className="absolute top-8 right-8 p-8 opacity-5 pointer-events-none h-64 w-64">
              <Image
                src="/logos/FCRNM.svg"
                alt=""
                fill
                className="object-contain brightness-0 invert"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-16 relative z-10">
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
                  {t("strategy")}
                </h4>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t("strategyDesc")}
                </p>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
                  {t("work")}
                </h4>
                <ul className="space-y-4">
                  {t.raw("workItems").map((item: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-lg font-medium text-foreground/90"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
                  {t("deliverables")}
                </h4>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t("deliverablesDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Approach / Process Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tighter mb-6 italic uppercase">
              {t("approachTitle")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {t("approachIntro")}
            </p>

            <div className="rounded-[2rem] bg-card/40 border border-white/5 p-10 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <VolumeX className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
                  {t("approachKeyTitle")}
                </h3>
              </div>
              <p className="text-lg text-foreground/90 leading-relaxed">
                {t("approachKeyBody")}
              </p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-24 bg-muted/30 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4">
                {t("resultsTitle")}
              </h2>
              <p className="text-2xl lg:text-3xl text-foreground leading-relaxed font-medium">
                {t("resultsBody")}
              </p>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="container mx-auto px-4 py-24">
          <figure className="max-w-3xl mx-auto text-center">
            <Quote className="h-10 w-10 text-primary/40 mx-auto mb-6" />
            <blockquote className="text-2xl lg:text-3xl font-medium text-foreground/90 leading-relaxed italic">
              {t("quoteText")}
            </blockquote>
            <figcaption className="mt-6 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {t("quoteAuthor")}
            </figcaption>
          </figure>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-3xl mx-auto rounded-[2rem] border border-white/10 bg-card/30 p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              {t("ctaBody")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/book">
                  {t("ctaBookLink")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services/video">{t("ctaServiceLink")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
