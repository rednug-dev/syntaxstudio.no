"use client";

import dynamic from "next/dynamic";
import Header from "@/components/header";
import HeroVideoSection from "@/components/hero-video-section";
import PartnersCarousel from "@/components/partners-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/footer";

const FeaturedWorkSection = dynamic(
  () => import("@/components/featured-work-section"),
  { loading: () => <Skeleton className="w-full h-[400px]" /> }
);
const TestimonialsSection = dynamic(
  () => import("@/components/testimonials-section"),
  { loading: () => <Skeleton className="w-full h-[300px]" /> }
);
const ServicesIntroSection = dynamic(
  () => import("@/components/services-intro-section"),
  { loading: () => <Skeleton className="w-full h-[400px]" /> }
);
const CtaBridgeSection = dynamic(
  () => import("@/components/cta-bridge-section"),
  { loading: () => <Skeleton className="w-full h-[200px]" /> }
);
const ProposalSection = dynamic(
  () => import("@/components/proposal-section"),
  { loading: () => <Skeleton className="w-full h-[400px]" /> }
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroVideoSection />
        <PartnersCarousel />
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
