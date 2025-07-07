
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from 'lucide-react';
import CaseStudyCard from "@/components/case-study-card";

export default function TjenesterPage() {
    const services = [
        {
            title: "Webutvikling & Design",
            description: "Vi bygger skreddersydde, responsive nettsider som gir resultater. Fra A til Å sørger vi for at siden din ser bra ut og funker sømløst på alle enheter.",
            features: ["Responsive design", "CMS-integrasjon", "SEO", "E-handel"]
        },
        {
            title: "Merkevarebygging & Identitet",
            description: "Vi bygger sterke, minneverdige merkevarer. Fra logo til strategi skaper vi en identitet som treffer målgruppa di og får deg til å skille deg ut.",
            features: ["Logo design", "Visuell identitet", "Merkevarestrategi", "Navn og budskap"]
        },
        {
            title: "AI & Automatisering",
            description: "Vi bruker AI for å booste effektiviteten din. Fra smarte chatbots til automatisering av kjedelige oppgaver – vi lar deg fokusere på det som teller.",
            features: ["AI-chatbots", "Automatisering", "Dataanalyse", "Maskinlæring"]
        }
    ];

    const caseStudies = [
        {
            customer: "RiseUp",
            title: "Styrket Digital Tilstedeværelse for Økt Impact",
            intro: "Ny branding og nettside for å booste RiseUps digitale profil og styrke søknadene deres om midler.",
            thumbnail: "/riseup/riseupnewlogo-2.png",
            details: `RiseUp, en organisasjon for ungdom med minoritetsbakgrunn, trengte en digital oppgradering for å matche sitt viktige arbeid og styrke søknadsprosesser for finansiering.
            
            Vår løsning var en total-makeover av merkevaren og en ny, proff nettside:
            - Ny visuell identitet og logo som utstråler profesjonalitet og varme.
            - Moderne, brukervennlig nettside som kommuniserer deres misjon og resultater.
            - Fremheving av arrangementer og suksesshistorier for å bygge tillit.
            
            Med en styrket digital plattform fremstår RiseUp nå som en mer seriøs aktør, noe som har økt deres troverdighet og sjanser i kampen om viktige midler.`,
            gallery: ["/riseup/riseup1.PNG", "/riseup/riseup2.PNG", "/riseup/riseup3.PNG"]
        },
        {
            customer: "Bites",
            title: "Fra Pop-Up til Proff Aktør",
            intro: "Fra pop-up til proft. Vi ga Bites den digitale plattformen de trengte for å lande større festivaler og events.",
            thumbnail: "/bites/biteslogo.png",
            details: `Bites startet som et kult pop-up konsept, men manglet en proff plattform for bestillinger og merkevarebygging. 
            
            Vi utviklet en stilren og mobilvennlig nettside med en smooth bestillingsprosess:
            - Intuitiv bestillingsflyt for rask service.
            - Sikker og enkel online betaling.
            - Et proft design som bygger tillit og gjenkjennelse.
            
            Med sin nye digitale plattform ble Bites en seriøs aktør. Dette åpnet dører til store festivaler og events, og la grunnlaget for videre vekst.`,
            gallery: ["/bites/bites1.jpg", "/bites/bites2.png", "/bites/bites3.png"]
        },
        {
            customer: "DataSec",
            title: "Innovativ Sikkerhetstech for Vekterbransjen",
            intro: "Ny identitet, ny nettside og custom tech for DataSec. Vi leverer sanntidsdata som forbedrer sikkerheten.",
            thumbnail: "/datasec/DataSec-Logo.png",
            details: `DataSec utfordrer vekterbransjen med innovativ teknologi. Vi ga dem en ny visuell identitet og en proff nettside som matcher deres moderne tilnærming.

En sentral del av samarbeidet er utviklingen av skreddersydd teknologi, som en sanntidsteller for utesteder. Systemet gir full oversikt over antall gjester via et dashbord, som lar kundene optimalisere bemanning og forbedre sikkerheten. Dette gir også verdifull data for smartere, datadrevne beslutninger.`,
            gallery: ["/datasec/datasec1.png"]
        }
    ];

    const testimonials = [
        {
            name: "Ola Nordmann",
            title: "CEO, Start-up AS",
            avatar: "/avatars/01.png",
            testimonial: "Samarbeidet var en game-changer. Deres skills i webutvikling og AI tok oss til neste nivå."
        },
        {
            name: "Kari Svendsen",
            title: "Markedssjef, Etablert Bedrift",
            avatar: "/avatars/02.png",
            testimonial: "Fantastisk jobb med vår nye merkevare. De nailet visjonen vår og leverte et resultat som overgikk alle forventninger."
        }
    ];

    return (
        <>
            <Header />
            <main>
                <div className="container mx-auto px-4 py-20 sm:py-28">
                    {/* Services Section */}
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
                                    <div className="bg-muted rounded-lg p-8 h-64 flex items-center justify-center">
                                        <p className="text-muted-foreground">Illustrasjon kommer her</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Case Studies Section */}
                    <div id="case-studies" className="mb-28">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold font-headline">Utvalgte Caser</h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                                Se hvordan vi har hjulpet andre bedrifter å lykkes.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {caseStudies.map((caseStudy, index) => (
                                <CaseStudyCard key={index} caseStudy={caseStudy} />
                            ))}
                        </div>
                    </div>

                    {/* Testimonials Section */}
                    <div>
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
