"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TokyoLockup } from "@/components/work/tokyo-lockup";
import { BurgerMark } from "@/components/work/burger-mark";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
  /** Project slug — drives the Syntax × Tokyo skin below. */
  slug?: string;
  /** Optional leading pill, e.g. the red "Ny" on the newest project. */
  badge?: string;
};

function CaseCard({ c, seeLiveLabel }: { c: ProjectCase; seeLiveLabel: string }) {
  const isImagePath = c.logo.startsWith("/");
  const isExternal = c.isExternal ?? c.url?.startsWith("http");
  // Tokyo gets the bespoke lockup + vermilion tint from the design handoff;
  // every other project keeps the plain wordmark card.
  const isTokyo = c.slug === "tokyo";
  // The burger client is anonymised, so its card carries our own mark.
  const isBurger = c.slug === "burger";

  return (
    <div
      className={cn(
        "flex flex-col h-full min-h-[486px] rounded-3xl border p-8 shadow-sm transition-all [transition-duration:400ms] group",
        isTokyo
          ? "border-[#e0483d]/40 hover:-translate-y-[3px] hover:border-white/[0.22]"
          : "bg-card/40 hover:shadow-xl hover:border-primary/20"
      )}
      style={
        isTokyo
          ? {
              background: "radial-gradient(135% 90% at 50% -12%, #27272b 0%, #161618 62%)",
              boxShadow:
                "0 20px 44px -22px rgba(0,0,0,.62), 0 24px 54px -22px rgba(224,72,61,.35)",
            }
          : undefined
      }
    >
      {/* Centered Logo at Top */}
      <div className="flex flex-col items-center mb-8">
        <div className={cn("relative flex items-center justify-center mb-4", isTokyo ? "h-[98px] overflow-hidden" : "h-24 w-40")}>
          {isTokyo ? (
            <TokyoLockup />
          ) : isBurger ? (
            <BurgerMark className="h-[72px] w-auto text-foreground opacity-80 group-hover:opacity-100 transition-opacity" />
          ) : isImagePath ? (
            <Image src={c.logo} alt={c.heading} fill sizes="160px" className="object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
          ) : (
            <span className="text-3xl font-bold tracking-tighter text-foreground/90">
              {c.logo}
            </span>
          )}
        </div>

        {/* Services */}
        <div className="flex flex-wrap justify-center gap-2">
          {c.badge && (
            <Badge variant="outline" className="text-[10px] uppercase tracking-[0.15em] font-semibold px-2.5 py-0.5 border-[#e0483d]/50 bg-[#e0483d]/[0.12] text-[#f3897d]">
              {c.badge}
            </Badge>
          )}
          {c.stack?.map((s) => (
            <Badge key={s} variant="outline" className={cn(
              "text-[10px] uppercase tracking-[0.15em] font-semibold px-2.5 py-0.5",
              isTokyo
                ? "border-white/[0.12] bg-white/[0.045] text-white/[0.72]"
                : "bg-primary/5 border-primary/10"
            )}>
              {s}
            </Badge>
          ))}
        </div>
      </div>

      {/* Centered Content */}
      <div className={cn("flex-1 flex flex-col items-center text-center", isTokyo && "pt-[26px]")}>
        <h3 className={cn(
          "font-bold tracking-tight",
          isTokyo ? "font-headline text-[22px] leading-[1.15] tracking-[-0.01em] text-white mb-3.5" : "text-2xl mb-4"
        )}>
          {c.heading}
        </h3>
        <p className={cn(
          isTokyo
            ? "text-[13px] leading-[1.62] text-white/[0.52] max-w-[286px] [text-wrap:pretty]"
            : "text-sm text-muted-foreground leading-relaxed max-w-[280px]"
        )}>
          {c.paragraphs[0]}
        </p>
      </div>

      {/* Elegant Footer with Button */}
      <div className={cn(
        "flex flex-col items-center gap-6",
        isTokyo ? "mt-[26px] pt-6 border-t border-white/[0.09]" : "mt-8 pt-6 border-t border-primary/5"
      )}>
        {c.url && (() => {
          const btnClass = isTokyo
            ? "rounded-full px-[26px] py-[11px] h-auto font-bold uppercase tracking-[0.2em] text-[10px] border-white/[0.26] text-white bg-transparent hover:bg-white hover:text-[#141416] transition-colors duration-300"
            : "rounded-full px-6 font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-primary-foreground transition-all";
          return isExternal ? (
            <Button variant="outline" size="sm" className={btnClass} asChild>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {seeLiveLabel}
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className={btnClass} asChild>
              <Link href={c.url}>
                {seeLiveLabel}
              </Link>
            </Button>
          );
        })()}
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
      {/* Desktop: static grid — 3 projects center the hero, 4+ fall into an even grid */}
      <div
        className={cn(
          "hidden lg:grid gap-4",
          projects.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        )}
      >
        {projects.map((c, index) => (
          <div
            key={c.heading}
            className={cn(
              projects.length === 3 &&
                (index === 0 ? "order-2" : index === 1 ? "order-1" : "order-3")
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
            align: "center",
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
