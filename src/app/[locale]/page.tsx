import dynamic from 'next/dynamic';
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import { Skeleton } from "@/components/ui/skeleton";

const ServicesIntroSection = dynamic(() => import('@/components/services-intro-section'), {
  loading: () => <Skeleton className="w-full h-[400px]" />,
});
const ProposalSection = dynamic(() => import('@/components/proposal-section'), {
  loading: () => <Skeleton className="w-full h-[400px]" />,
});
const Footer = dynamic(() => import('@/components/footer'), {
  loading: () => <Skeleton className="w-full h-[200px]" />,
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesIntroSection />
        <ProposalSection />
      </main>
      <Footer />
    </div>
  );
}
