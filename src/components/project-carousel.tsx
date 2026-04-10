"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export type ProjectCase = {
  heading: string;
  url?: string;
  isExternal?: boolean;
  logo: string;
  heroImage: string;
  heroAlt?: string;
  paragraphs: ReadonlyArray<string>;
  stack?: ReadonlyArray<string>;
  flairs?: ReadonlyArray<string>;
};

function CaseCard({ c, seeLiveLabel }: { c: ProjectCase; seeLiveLabel: string }) {
  const isImagePath = c.logo.startsWith("/");
  const isExternal = c.isExternal ?? c.url?.startsWith("http");

  return (
    <div className="flex flex-col h-full min-h-[480px] rounded-3xl border bg-card/40 p-8 shadow-sm transition-all hover:shadow-xl hover:border-primary/20 group">
      {/* Centered Logo at Top */}
      <div className="flex flex-col items-center mb-8">
        <div className="h-24 w-40 flex items-center justify-center mb-4">
          {isImagePath ? (
            <img src={c.logo} alt={c.heading} className={cn("max-h-full max-w-full object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity", c.logo.includes("Jønk") && "max-h-[70%]")} />
          ) : (
            <span className="text-3xl font-bold tracking-tighter text-foreground/90">
              {c.logo}
            </span>
          )}
        </div>
        
        {/* Services */}
        <div className="flex flex-wrap justify-center gap-2">
          {c.stack?.map((s) => (
            <Badge key={s} variant="outline" className="text-[10px] uppercase tracking-[0.15em] font-semibold px-2.5 py-0.5 bg-primary/5 border-primary/10">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold mb-4 tracking-tight">{c.heading}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
          {c.paragraphs[0]}
        </p>
      </div>

      {/* Elegant Footer with Button */}
      <div className="mt-8 pt-6 border-t border-primary/5 flex flex-col items-center gap-6">
        {c.url && (
          isExternal ? (
            <Button variant="outline" size="sm" className="rounded-full px-6 font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-primary-foreground transition-all" asChild>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {seeLiveLabel}
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="rounded-full px-6 font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-primary-foreground transition-all" asChild>
              <Link href={c.url}>
                {seeLiveLabel}
              </Link>
            </Button>
          )
        )}
      </div>
    </div>
  );
}

export default function ProjectCarousel({ projects, seeLive }: { projects: ProjectCase[]; seeLive: string }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full mt-16">
      {/* Desktop: static grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4">
        {projects.map((c, index) => (
          <div
            key={c.heading}
            className={cn(
              index === 0 ? "order-2" : index === 1 ? "order-1" : "order-3"
            )}
          >
            <CaseCard c={c} seeLiveLabel={seeLive} />
          </div>
        ))}
      </div>

      {/* Mobile: carousel */}
      <div className="lg:hidden">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {projects.map((c) => (
              <CarouselItem key={c.heading} className="pl-4 basis-[85%] sm:basis-1/2">
                <CaseCard c={c} seeLiveLabel={seeLive} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              className={cn(
                "h-1.5 transition-all rounded-full",
                current === i ? "w-8 bg-primary" : "w-2 bg-primary/20"
              )}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
