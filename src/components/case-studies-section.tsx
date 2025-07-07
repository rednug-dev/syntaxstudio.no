"use client"
import CaseStudyCard from './case-study-card';
import { caseStudies } from '@/lib/case-studies';

export default function CaseStudiesSection() {
    return (
        <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Våre Caser</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((caseStudy, index) => (
                        <CaseStudyCard key={index} caseStudy={caseStudy} />
                    ))}
                </div>
            </div>
        </section>
    );
}
