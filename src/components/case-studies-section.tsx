"use client"
import CaseStudyCard from './case-study-card';

const caseStudies = [
    {
        customer: "Bites",
        title: "Bites AS",
        intro: "Bites AS er et programvarehus som bygger skreddersydde, forretningskritiske IT-løsninger.",
        thumbnail: "/public/bites/biteslogo.png",
        details: "Vi hjalp Bites med å utvikle en ny landingsside for å tiltrekke seg nye kunder og vise frem deres portefølje. Vi fokuserte på å skape et moderne og profesjonelt design som gjenspeiler Bites' ekspertise.",
        gallery: [
            "/public/bites/bites1.jpg",
            "/public/bites/bites2.png",
            "/public/bites/bites3.png"
        ]
    }
];

export default function CaseStudiesSection() {
    return (
        <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Våre kundecaser</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((caseStudy, index) => (
                        <CaseStudyCard key={index} caseStudy={caseStudy} />
                    ))}
                </div>
            </div>
        </section>
    );
}
