"use client";

import { useTranslations } from "next-intl";
import { partners } from "@/lib/case-studies";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PartnersCarousel() {
  const t = useTranslations("About.WorkIntro");

  return (
    <section className="py-16 border-t border-border/40">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-10">
          {t("partnersTitle")}
        </h3>

        {/* Infinite scroll animation */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

          <div className="flex animate-scroll">
            {/* Duplicate the list for seamless loop */}
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex-shrink-0 mx-8 lg:mx-12 flex items-center justify-center h-12"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={48}
                  className={cn(
                    "h-8 max-w-[100px] object-contain opacity-50 hover:opacity-100 transition-opacity duration-300",
                    "brightness-0 invert"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
