import Image from "next/image";
import { Award, CodeXml, GitCommit, MoveRight, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import ProposalSection from "@/components/proposal-section";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
    <section id="home" className="container mx-auto px-4 py-24 sm:py-32 text-center animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline tracking-tighter">
          Innovative Web Design, Branding, and Automation
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Syntax Studio Digital crafts bespoke digital experiences that elevate your brand and automate your success. Let's build the future, together.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#portfolio">Our Work</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
             <a href="#proposal">
              Contact Us <MoveRight className="ml-2" />
             </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  const achievements = [
    { icon: <Award className="w-8 h-8" />, value: "12+", label: "Design Awards" },
    { icon: <GitCommit className="w-8 h-8" />, value: "100+", label: "Projects Completed" },
    { icon: <Users className="w-8 h-8" />, value: "80+", label: "Happy Clients" },
    { icon: <Star className="w-8 h-8" />, value: "5-Star", label: "Average Rating" },
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
    { title: "QuantumLeap CRM", description: "A futuristic CRM platform with AI-driven insights and automation.", image: "https://placehold.co/600x400.png", tags: ["Web Design", "Automation"], hint: "abstract technology" },
    { title: "NovaBank", description: "Rebranding and web overhaul for a next-generation digital bank.", image: "https://placehold.co/600x400.png", tags: ["Branding", "Web Design"], hint: "modern finance" },
    { title: "Aetherius Logistics", description: "Streamlined logistics management through a custom-built automation suite.", image: "https://placehold.co/600x400.png", tags: ["Automation"], hint: "global shipping" },
    { title: "Zenith Health", description: "A calming and intuitive user experience for a digital wellness brand.", image: "https://placehold.co/600x400.png", tags: ["Branding", "Web Design"], hint: "minimalist wellness" },
  ];

  return (
    <section id="portfolio" className="container mx-auto px-4 py-20 sm:py-28">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold font-headline">Our Portfolio</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We take pride in our work. Explore some of our recent projects that showcase our expertise and creativity.
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
        { name: "Eva Chen", company: "CEO, QuantumLeap", text: "Syntax Studio transformed our vision into a stunning reality. Their attention to detail and commitment to excellence are second to none.", avatar: "https://placehold.co/100x100.png", hint: "woman portrait" },
        { name: "Johnathan Lee", company: "Founder, NovaBank", text: "The rebranding they delivered was a game-changer for our business. We've seen a massive increase in user engagement.", avatar: "https://placehold.co/100x100.png", hint: "man portrait" },
        { name: "Maria Rodriguez", company: "COO, Aetherius Logistics", text: "Their automation solution saved us thousands of hours. Incredibly efficient and professional team.", avatar: "https://placehold.co/100x100.png", hint: "professional woman" },
    ];

  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold font-headline">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We're building partnerships, not just projects. Here's what our clients think of our work.
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
                    <Image src="https://placehold.co/600x600.png" alt="Syntax Studio Digital Team" width={600} height={600} className="rounded-lg shadow-lg" data-ai-hint="digital agency" />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                    <h2 className="text-4xl sm:text-5xl font-bold font-headline">About Syntax Studio</h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        Founded on the principle of merging creativity with technology, Syntax Studio Digital is a collective of passionate designers, developers, and strategists. We believe in the power of a strong digital presence and work tirelessly to create solutions that are not only beautiful but also powerfully effective.
                    </p>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Our expertise spans across web design, corporate branding, and business process automation. By understanding your unique needs, we craft bespoke strategies that drive growth, engagement, and success.
                    </p>
                </div>
            </div>
        </section>
    );
}
