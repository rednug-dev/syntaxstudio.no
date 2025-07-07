import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveBackground } from "@/components/interactive-background";

export default function HeroSection() {
  return (
    <section id="home" className="relative container mx-auto px-4 py-24 sm:py-32 text-center animate-fade-in-up">
      <InteractiveBackground />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline tracking-tighter">
          Webdesign, branding & AI.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Vi bygger digitale opplevelser som løfter merkevaren din og booster veksten. La oss bygge fremtiden sammen.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <a href="/tjenester#case-studies">Se caser</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
             <a href="#proposal">
              Ta kontakt <MoveRight className="ml-2" />
             </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
