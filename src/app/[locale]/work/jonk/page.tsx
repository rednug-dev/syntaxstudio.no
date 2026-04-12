import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Video, ArrowLeft, ArrowRight, Instagram, Award, Check, Quote, Swords } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { VideoCard } from "@/components/work/video-card";
import { PreloaderProvider } from "@/components/ui/asset-preloader";
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
  const t = await getTranslations({ locale, namespace: "Meta.workJonk" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/work/jonk`,
      languages: { en: "/en/work/jonk", no: "/no/work/jonk", "x-default": "/en/work/jonk" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}/work/jonk`,
      type: "article",
    },
  };
}

export default async function JonkWorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("About.WorkIntro.projects.jonk.page");
  const metaT = await getTranslations({ locale, namespace: "Meta.workJonk" });

  const { breadcrumb, article } = buildWorkJsonLd({
    slug: "jonk",
    title: metaT("title"),
    description: metaT("description"),
    image: "/showcase/bigpic.webp",
    locale,
  });

  const BLOB_BASE = "https://iz6e2iomhf0u9x5o.public.blob.vercel-storage.com";

  // Reordered social ads: ad2 (smallest) is now first and preloaded
  const socialAds = [
    { 
      src: [`${BLOB_BASE}/ad2.webm`, "/jønk/ad2_vertical.mp4"], 
      label: t("socialCampaign2"),
      preload: true 
    },
    { 
      src: [`${BLOB_BASE}/ad1.webm`, "/jønk/ad1_vertical.mp4"], 
      label: t("socialCampaign1"),
      preload: true 
    },
    { 
      src: [`${BLOB_BASE}/ad3.webm`, "/jønk/ad3_vertical.mp4"], 
      label: t("socialCampaign3"),
      preload: true 
    },
  ];

  return (
    <PreloaderProvider>
      <Script
        id="ld-jonk-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Script
        id="ld-jonk-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
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
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center relative">
                      <Image src="/logos/jønk.png" alt="Jønk" fill sizes="56px" className="object-contain p-2 brightness-0 invert" />
                  </div>
                  <Badge variant="outline" className="uppercase tracking-[0.2em] text-[10px] py-1 px-3 border-primary/20 text-primary">
                    {t("badge")}
                  </Badge>
                </div>
                
                <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] italic font-headline">
                  {t("title")}
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  {t("description")}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                      <Video className="h-4 w-4" /> {t("socialAdsCount")}
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                      <Camera className="h-4 w-4" /> {t("productPhotosCount")}
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                      <Award className="h-4 w-4" /> {t("professionalGrade")}
                   </div>
                </div>
              </div>

              {/* Hero Video - Restored to burgers.webm and preloaded */}
              <VideoCard
                  src={[`${BLOB_BASE}/burgers.webm`, "/jønk/burgers_vertical.mp4"]}
                  aspectRatio="vertical"
                  objectPosition="bottom"
                  alwaysPlay
                  preload={true}
                  className="aspect-[4/5] lg:aspect-square"
                  overlay={
                      <div className="absolute bottom-10 left-10">
                          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-2">{t("mainFeature")}</p>
                          <h3 className="text-2xl font-bold text-white">{t("cinematicTextures")}</h3>
                      </div>
                  }
              />
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

          {/* Campaign Callout */}
          <section className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto rounded-[2rem] bg-card/40 border border-white/5 p-10 lg:p-12 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Swords className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
                  {t("campaignTitle")}
                </h3>
              </div>
              <p className="text-lg text-foreground/90 leading-relaxed">
                {t("campaignBody")}
              </p>
            </div>
          </section>

          {/* Social Ads Section */}
          <section className="py-24 bg-muted/30 border-y border-white/5">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                  <div className="max-w-xl">
                      <h2 className="text-4xl font-bold tracking-tighter mb-4 italic uppercase">{t("commercial")}</h2>
                      <p className="text-muted-foreground text-lg">{t("spiritDesc")}</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                      <Instagram className="h-5 w-5" />
                      <span className="text-sm font-bold uppercase tracking-widest">{t("optimizedForReels")}</span>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                  {socialAds.map((ad, idx) => (
                      <VideoCard 
                          key={idx}
                          src={ad.src}
                          aspectRatio="vertical"
                          preload={ad.preload}
                      />
                  ))}
              </div>
            </div>
          </section>

          {/* Photo & Production Gallery */}
          <section className="container mx-auto px-4 py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {/* Text Card - Matches height of square images */}
                  <div className="lg:col-span-2 rounded-[2rem] bg-primary p-10 flex flex-col justify-center text-primary-foreground border border-white/5 shadow-xl aspect-square lg:aspect-auto lg:h-full">
                      <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                          <Camera className="h-6 w-6" />
                      </div>
                      <h3 className="text-3xl font-bold tracking-tight mb-3 uppercase italic leading-none">{t("photoTitle")}</h3>
                      <p className="text-primary-foreground/80 text-base leading-relaxed max-w-md">
                          {t("photoDesc")}
                      </p>
                  </div>
                  {/* Poster 1 - Matches height of text card */}
                  <div className="rounded-[2rem] overflow-hidden border border-white/5 shadow-xl group aspect-square lg:aspect-auto lg:h-full relative">
                      <Image 
                        src={`${BLOB_BASE}/p1.5.png`} 
                        alt="Jønk burger – produktfoto"
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover object-[center_35%] group-hover:scale-110 transition-transform duration-1000" 
                      />
                  </div>

                  <div className="lg:row-span-2 rounded-[2rem] overflow-hidden border border-white/5 shadow-xl group aspect-[9/16] lg:aspect-auto relative">
                      <Image 
                        src={`${BLOB_BASE}/prophoto_vertical.jpg`} 
                        alt="Jønk signaturburger – produktbilde"
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                      />
                  </div>

                  <div className="rounded-[2rem] overflow-hidden border border-white/5 shadow-xl group aspect-square relative">
                      <Image 
                        src={`${BLOB_BASE}/p2.1.png`} 
                        alt="Jønk burger – produktbilde fra siden"
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover object-[center_37%] group-hover:scale-110 transition-transform duration-1000" 
                      />
                  </div>

                  <div className="rounded-[2rem] overflow-hidden border border-white/5 shadow-xl group aspect-square relative">
                      <Image 
                        src={`${BLOB_BASE}/p3.1.png`} 
                        alt="Jønk burger – nærbilde av detaljer"
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover object-[center_25%] group-hover:scale-110 transition-transform duration-1000" 
                      />
                  </div>

                  {/* Square Video */}
                  <div className="rounded-[2rem] overflow-hidden border border-white/5 bg-black shadow-xl group aspect-square relative">
                      <VideoCard 
                          src={`${BLOB_BASE}/jonkfries_square.mp4`} 
                          aspectRatio="square"
                          alwaysPlay
                          preload={false}
                          className="w-full h-full rounded-none border-none shadow-none"
                          videoClassName="object-cover"
                      />
                  </div>
              </div>
          </section>

          {/* Strategy Section */}
          <section className="container mx-auto px-4 pt-12 pb-24">
            <div className="rounded-[3rem] bg-card/40 border border-white/5 p-12 pr-16 lg:p-20 lg:pr-32 shadow-2xl relative overflow-hidden">
              <div className="absolute top-8 right-8 p-8 opacity-5 pointer-events-none h-64 w-64">
                  <Image src="/logos/jønk.png" alt="" fill sizes="256px" className="object-contain brightness-0 invert" />
              </div>
              
              <div className="grid lg:grid-cols-3 gap-16 relative z-10">
                  <div className="space-y-6">
                      <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">{t("strategy")}</h4>
                      <p className="text-xl text-muted-foreground leading-relaxed">
                          {t("strategyDesc")}
                      </p>
                  </div>
                  
                  <div className="space-y-6">
                      <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">{t("work")}</h4>
                      <ul className="space-y-4">
                          {t.raw("workItems").map((item: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-3 text-lg font-medium text-foreground/90">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {item}
                          </li>
                          ))}
                      </ul>
                  </div>
                  
                  <div className="space-y-6">
                      <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">{t("deliverables")}</h4>
                      <p className="text-xl text-muted-foreground leading-relaxed">
                          {t("deliverablesDesc")}
                      </p>
                  </div>
              </div>
            </div>
          </section>

          {/* Scope / Full deliverables Section */}
          <section className="container mx-auto px-4 py-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tighter mb-6 italic uppercase">
                {t("scopeTitle")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {t("scopeIntro")}
              </p>
              <ul className="space-y-4">
                {(t.raw("scopeItems") as string[]).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-lg text-foreground/90">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Results Section */}
          <section className="py-24 bg-muted/30 border-y border-white/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-8 text-center">
                  {t("resultsTitle")}
                </h2>
                <div className="text-center mb-12">
                  <div className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight tabular-nums">
                    {t("resultsStatNumber")}
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                    {t("resultsStatLabel")}
                  </p>
                </div>
                <p className="text-xl lg:text-2xl text-foreground/90 leading-relaxed font-medium text-center max-w-3xl mx-auto">
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
                  <Link href="/services/marketing">{t("ctaServiceLink")}</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PreloaderProvider>
  );
}
