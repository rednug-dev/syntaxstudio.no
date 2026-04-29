import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import HeroVideoSection from "@/components/hero-video-section";
import StatsStrip from "@/components/stats-strip";
import Footer from "@/components/footer";
import FeaturedWorkSection from "@/components/featured-work-section";
import TestimonialsSection from "@/components/testimonials-section";
import ServicesIntroSection from "@/components/services-intro-section";
import CtaBridgeSection from "@/components/cta-bridge-section";
import ProposalSection from "@/components/proposal-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.home" });

  const path = locale === "no" ? "/" : "/en";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: {
        no: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: path,
    },
  };
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main id="main-content" className="flex-1">
        <HeroVideoSection />
        <StatsStrip />
        <FeaturedWorkSection />
        <TestimonialsSection />
        <ServicesIntroSection />
        <CtaBridgeSection />
        <ProposalSection />
      </main>
      <Footer />
    </div>
  );
}
