import CaseStudyCard from '@/components/case-study-card';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { caseStudies } from '@/lib/case-studies';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tjenester | Syntax Studio',
  description: 'Utforsk tjenestene vi tilbyr hos Syntax Studio, fra webdesign og merkevarebygging til AI-løsninger og automatisering. Se våre caser og lær hvordan vi kan hjelpe din bedrift å vokse.',
};

export default function TjenesterPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            <Header />
            <main className="flex-1">
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold text-center mb-4 text-4xl">Våre Tjenester</h1>
                        <p className="text-lg text-center text-muted-foreground mb-12">
                            Vi tilbyr skreddersydde løsninger som hjelper din bedrift å vokse.
                        </p>
                    </div>
                </section>
                <section id="case-studies" className="py-20 bg-muted/20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Caser</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {caseStudies.map((caseStudy, index) => (
                                <CaseStudyCard key={index} caseStudy={caseStudy} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}