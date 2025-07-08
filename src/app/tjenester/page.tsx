import CaseStudyCard from '@/components/case-study-card';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { caseStudies, services, testimonials } from '@/lib/case-studies';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tjenester | Syntax Studio',
  description: 'Utforsk tjenestene vi tilbyr hos Syntax Studio, fra webdesign og merkevarebygging til AI-løsninger og automatisering. Se våre caser og lær hvordan vi kan hjelpe din bedrift å vokse.',
};

const serviceIllustrations = [
    "/services/design.webp",
    "/services/identity.webp",
    "/services/ai.webp"
];

export default function TjenesterPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            <Header />
            <main className="flex-1">
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl sm:text-5xl font-bold font-headline">Våre Tjenester</h1>
                            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                                Vi leverer skreddersydde løsninger som skaper reell verdi.
                            </p>
                        </div>
                        <div className="space-y-16 mb-28">
                            {services.map((service, index) => (
                                <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}>
                                        <h2 className="text-3xl font-bold font-headline mb-4">{service.title}</h2>
                                        <p className="text-muted-foreground mb-6">{service.description}</p>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, i) => (
                                                <li key={i} className="flex items-center">
                                                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={`relative ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                        <div className="bg-muted rounded-lg h-64 flex items-center justify-center overflow-hidden">
                                            <Image
                                                src={serviceIllustrations[index]}
                                                alt={`Illustrasjon for ${service.title}`}
                                                width={910}
                                                height={512}
                                                   className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="case-studies" className="py-20 bg-muted/20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold font-headline">Utvalgte Caser</h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                                Trykk for å se hvordan vi har hjulpet andre bedrifter å lykkes.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {caseStudies.map((caseStudy, index) => (
                                <CaseStudyCard key={index} caseStudy={caseStudy} />
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold font-headline">Hva våre kunder sier</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <Card key={index}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start">
                                            <Avatar className="w-12 h-12 mr-4">
                                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <blockquote className="text-lg italic border-l-4 pl-4">
                                                    {testimonial.testimonial}
                                                </blockquote>
                                                <p className="mt-4 font-bold">{testimonial.name}</p>
                                                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
