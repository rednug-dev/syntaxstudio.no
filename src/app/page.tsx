import Image from "next/image";
import { Award, CodeXml, GitCommit, MoveRight, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import ProposalSection from "@/components/proposal-section";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { InteractiveBackground } from "@/components/interactive-background";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AchievementsSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ProposalSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative container mx-auto px-4 py-24 sm:py-32 text-center animate-fade-in-up">
      <InteractiveBackground />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline tracking-tighter">
          Innovativt webdesign, merkevarebygging og automatisering
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Syntax Studio skaper skreddersydde digitale opplevelser som løfter merkevaren din og automatiserer din suksess. La oss bygge fremtiden, sammen.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#portfolio">Vårt arbeid</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
             <a href="#proposal">
              Kontakt oss <MoveRight className="ml-2" />
             </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  const achievements = [
    { icon: <Award className="w-8 h-8" />, value: "12+", label: "Designpriser" },
    { icon: <GitCommit className="w-8 h-8" />, value: "100+", label: "Fullførte prosjekter" },
    { icon: <Users className="w-8 h-8" />, value: "80+", label: "Fornøyde kunder" },
    { icon: <Star className="w-8 h-8" />, value: "5-stjerners", label: "Gjennomsnittlig vurdering" },
  ];

  return (
    <section className="bg-muted/50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {achievements.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms`}}>
              <div className="text-primary">{item.icon}</div>
              <p className="text-3xl sm:text-4xl font-bold font-headline">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const projects = [
    { title: "QuantumLeap CRM", description: "En futuristisk CRM-plattform med AI-drevet innsikt og automatisering.", image: "https://placehold.co/600x400.png", tags: ["Webdesign", "Automatisering"], hint: "abstract technology" },
    { title: "NovaBank", description: "Rebranding og totaloverhaling av nettsiden for en neste generasjons digital bank.", image: "https://placehold.co/600x400.png", tags: ["Merkevarebygging", "Webdesign"], hint: "modern finance" },
    { title: "Aetherius Logistics", description: "Strømlinjeformet logistikkstyring gjennom en skreddersydd automatiseringspakke.", image: "https://placehold.co/600x400.png", tags: ["Automatisering"], hint: "global shipping" },
    { title: "Zenith Health", description: "En beroligende og intuitiv brukeropplevelse for en digital velværemerkevare.", image: "https://placehold.co/600x400.png", tags: ["Merkevarebygging", "Webdesign"], hint: "minimalist wellness" },
  ];

  return (
    <section id="portfolio" className="container mx-auto px-4 py-20 sm:py-28">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold font-headline">Vår portefølje</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Vi er stolte av arbeidet vårt. Utforsk noen av våre nylige prosjekter som viser vår ekspertise og kreativitet.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms`}}>
            <CardHeader className="p-0">
              <Image src={project.image} alt={project.title} width={600} height={400} className="w-full h-auto transition-transform duration-300 group-hover:scale-105" data-ai-hint={project.hint} />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
              <CardDescription className="mt-2">{project.description}</CardDescription>
            </CardContent>
            <CardFooter>
              {project.tags.map(tag => <Badge key={tag} variant="secondary" className="mr-2">{tag}</Badge>)}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
    const testimonials = [
        { name: "Eva Chen", company: "CEO, QuantumLeap", text: "Syntax Studio forvandlet vår visjon til en fantastisk virkelighet. Deres øye for detaljer og forpliktelse til kvalitet er enestående.", avatar: "https://placehold.co/100x100.png", hint: "woman portrait" },
        { name: "Johnathan Lee", company: "Grunnlegger, NovaBank", text: "Rebrandingen de leverte var en 'game-changer' for virksomheten vår. Vi har sett en massiv økning i brukerengasjement.", avatar: "https://placehold.co/100x100.png", hint: "man portrait" },
        { name: "Maria Rodriguez", company: "COO, Aetherius Logistics", text: "Automatiseringsløsningen deres sparte oss for tusenvis av timer. Utrolig effektivt og profesjonelt team.", avatar: "https://placehold.co/100x100.png", hint: "professional woman" },
    ];

  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold font-headline">Hva våre kunder sier</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Vi bygger partnerskap, ikke bare prosjekter. Her er hva våre kunder mener om arbeidet vårt.
          </p>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="flex flex-col h-full">
                    <CardContent className="p-6 flex-grow">
                      <p className="italic">"{testimonial.text}"</p>
                    </CardContent>
                    <CardFooter className="flex items-center gap-4 pt-4 border-t">
                      <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full" data-ai-hint={testimonial.hint}/>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

function AboutSection() {
    return (
        <section id="about" className="container mx-auto px-4 py-20 sm:py-28">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in-up">
                    <Image src="https://placehold.co/600x600.png" alt="Syntax Studio-teamet" width={600} height={600} className="rounded-lg shadow-lg" data-ai-hint="digital agency" />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                    <h2 className="text-4xl sm:text-5xl font-bold font-headline">Om Syntax Studio</h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        Syntax Studio er grunnlagt på prinsippet om å forene kreativitet med teknologi, og er et kollektiv av lidenskapelige designere, utviklere og strateger. Vi tror på kraften i en sterk digital tilstedeværelse og jobber utrettelig for å skape løsninger som ikke bare er vakre, men også kraftfullt effektive.
                    </p>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Vår ekspertise spenner over webdesign, bedriftsidentitet og automatisering av forretningsprosesser. Ved å forstå dine unike behov, utformer vi skreddersydde strategier som driver vekst, engasjement og suksess.
                    </p>
                </div>
            </div>
        </section>
    );
}
