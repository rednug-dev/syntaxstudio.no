import Footer from "@/components/footer";
import Header from "@/components/header";
import ProposalSection from "@/components/proposal-section";
import WorkIntroSection from "@/components/project-showcase-2";
import ServicesFaq from "@/components/services-faq";

export default function ServicesPage() {
  return (
    <>
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
