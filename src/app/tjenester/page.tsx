
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from 'lucide-react';

export default function TjenesterPage() {
    const services = [
        {
            title: "Webutvikling & Design",
            description: "Vi skaper skreddersydde, responsive og visuelt tiltalende nettsider som gir resultater. Vår prosess involverer grundig planlegging, design og utvikling for å sikre at nettstedet ditt ikke bare ser bra ut, men også fungerer optimalt på alle enheter.",
            features: ["Responsive design", "CMS-integrasjon", "SEO-optimalisering", "E-handelsløsninger"]
        },
        {
            title: "Merkevarebygging & Identitet",
            description: "Vi hjelper deg med å bygge en sterk og gjenkjennelig merkevare. Fra logo og visuell profil til merkevarestrategi, jobber vi for å skape en identitet som resonnerer med din målgruppe og skiller seg ut i markedet.",
            features: ["Logo design", "Visuell identitet", "Merkevarestrategi", "Navngivning og budskap"]
        },
        {
            title: "AI & Automatisering",
            description: "Vi bruker kunstig intelligens for å effektivisere dine arbeidsprosesser. Våre løsninger inkluderer alt fra AI-drevne chatbots og dataanalyse til automatisering av repetitive oppgaver, slik at du kan fokusere på det som virkelig betyr noe.",
            features: ["AI-chatbots", "Automatisering av arbeidsoppgaver", "Dataanalyse", "Maskinlæringsmodeller"]
        }
    ];

    const testimonials = [
        {
            name: "Ola Nordmann",
            title: "CEO, Start-up AS",
            avatar: "/avatars/01.png",
            testimonial: "Samarbeidet med dette teamet har vært en game-changer for oss. Deres ekspertise innen webutvikling og AI har tatt virksomheten vår til et helt nytt nivå."
        },
        {
            name: "Kari Svendsen",
            title: "Markedssjef, Etablert Bedrift",
            avatar: "/avatars/02.png",
            testimonial: "Fantastisk arbeid med vår nye merkevareidentitet. De forsto visjonen vår perfekt og leverte et resultat som overgikk alle forventninger."
        }
    ];

    return (
        <>
            <Header />
            <main>
                <div className="container mx-auto px-4 py-20 sm:py-28">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold font-headline">Våre Tjenester</h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                            Vi dykker dypt inn i dine behov for å levere skreddersydde løsninger som skaper reell verdi.
                        </p>
                    </div>

                    <div className="space-y-16">
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
                                    <div className="bg-muted rounded-lg p-8 h-64 flex items-center justify-center">
                                        <p className="text-muted-foreground">Illustrasjon kommer her</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-28">
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
                </div>
            </main>
            <Footer />
        </>
    );
}
