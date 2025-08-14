import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveBackground } from "@/components/interactive-background";

export default function HeroSection() {
  return (
    <section id="home" className="relative container mx-auto px-4 py-24 sm:py-32 text-center animate-fade-in-up">
      <InteractiveBackground />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline tracking-tighter">
          Web Design, Branding & AI.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          We build digital experiences that elevate your brand and boost growth. Let's build the future together.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <a href="/pris">Pricing</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
             <a href="#proposal">
              Get in touch <MoveRight className="ml-2" />
             </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
