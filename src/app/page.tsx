import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ServicesIntroSection from "@/components/services-intro-section";
import ProposalSection from "@/components/proposal-section";

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
