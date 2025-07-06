
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

    const caseStudies = [
        {
            customer: "Fremtidsrettet Finans AS",
            title: "Ny Digital Plattform",
            intro: "En komplett overhaling av den digitale kundeopplevelsen for å øke engasjement og konvertering.",
            thumbnail: "/case-studies/case1-main.png",
            details: `For Fremtidsrettet Finans AS sto vi overfor utfordringen med en utdatert nettside som ikke lenger møtte kundenes forventninger. 
            
            Vår løsning var å designe og utvikle en helt ny, responsiv plattform med fokus på brukervennlighet og personalisering. Prosjektet inkluderte:
            - Dybdeanalyse av brukerreiser
            - Utvikling av et nytt, moderne designsystem
            - Implementering av en skreddersydd CMS-løsning for enkelt innholdsoppdatering
            - Integrasjon mot tredjeparts-APIer for sanntidsdata
            
            Resultatet var en 40% økning i konverteringer og en markant nedgang i kundehenvendelser til support.`,
            gallery: ["/case-studies/case1-gallery1.png", "/case-studies/case1-gallery2.png"]
        },
        {
            customer: "Grønn Vekst",
            title: "Visuell Identitet & Merkevarebygging",
            intro: "Hvordan vi bygget en helhetlig merkevare som posisjonerte Grønn Vekst som en leder innen bærekraft.",
            thumbnail: "/case-studies/case2-main.png",
            details: `Grønn Vekst trengte en visuell identitet som kunne kommunisere deres verdier og ambisjoner på en tydelig og appellerende måte. 
            
            Vi gjennomførte en strategisk prosess som resulterte i:
            - En ny logo og fargepalett som reflekterer bærekraft og innovasjon
            - Et komplett sett med designmaler for alt fra sosiale medier til trykksaker
            - En detaljert merkevarehåndbok for å sikre konsistent bruk
            
            Den nye identiteten ble svært godt mottatt og førte til en 200% økning i merkevaregjenkjennelse i deres viktigste markeder.`,
            gallery: ["/case-studies/case2-gallery1.png", "/case-studies/case2-gallery2.png"]
        },
        {
            customer: "Bites",
            title: "Fra Pop-Up til Profesjonell Aktør",
            intro: "Vi hjalp pop-up burgersjappen Bites med å etablere en profesjonell digital tilstedeværelse, noe som åpnet dører til større festivaler og arrangementer.",
            thumbnail: "/bites/biteslogo.png",
            details: `Bites startet som et spennende pop-up konsept, men manglet en profesjonell plattform for å håndtere bestillinger og presentere merkevaren sin. 
            
            Vi utviklet en stilren og mobilvennlig nettside med en strømlinjeformet bestillingsprosess. Løsningen inkluderte:
            - En intuitiv bestillingsflyt for rask service.
            - Sikker og enkel online betaling.
            - Et profesjonelt design som bygget tillit og anerkjennelse.
            
            Med sin nye digitale plattform fremsto Bites som en seriøs aktør. Dette førte til vellykkede samarbeid med flere store festivaler og arrangementer, og la grunnlaget for videre vekst.`,
            gallery: ["/bites/bites1.jpg", "/bites/bites2.png", "/bites/bites3.png"]
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
                    {/* Services Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold font-headline">Våre Tjenester</h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                            Vi dykker dypt inn i dine behov for å levere skreddersydde løsninger som skaper reell verdi.
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
                                Se hvordan vi har hjulpet andre bedrifter med å nå sine mål.
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
