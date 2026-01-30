import Footer from "@/components/footer";
import Header from "@/components/header";
import PromoBanner from "@/components/promo-banner";
import ProposalSection from "@/components/proposal-section";
import WorkIntroSection from "@/components/project-showcase-2";
import ServicesFaq from "@/components/services-faq";

export default function ServicesPage() {
  return (
    <>
      <PromoBanner />
      <Header />
      <main>
        <WorkIntroSection />
        <ServicesFaq />
        <ProposalSection />
      </main>
      <Footer />
    </>
  );
}
