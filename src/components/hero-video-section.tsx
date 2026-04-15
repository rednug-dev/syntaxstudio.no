"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function HeroVideoSection() {
  const t = useTranslations("Hero");
  return (
    <section className="relative min-h-dvh flex items-end justify-center overflow-hidden bg-background">
      {/* Preload LCP hero image (responsive) */}
      <link
        rel="preload"
        as="image"
        href="/webmat/heromobile3.png"
        media="(max-width: 639px)"
      />
      <link
        rel="preload"
        as="image"
        href="/webmat/hero4.png"
        media="(min-width: 640px)"
      />
      {/* Background Image */}
      <picture className="absolute inset-x-0 -top-20 sm:top-0 h-[80%] w-full">
        <source media="(max-width: 639px)" srcSet="/webmat/heromobile3.png" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/webmat/hero4.png"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[center_top]"
        />
      </picture>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline tracking-tighter"
        >
          {t.rich("title", {
            mark: (chunks) => (
              <mark className="bg-black/80 text-white rounded-lg px-2 pb-0.5">
                {chunks}
              </mark>
            ),
          })}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button size="lg" asChild>
            <Link href="/book">
              {t("primaryCta")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#work">
              {t("scrollCta")}
            </a>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <a href="#work" className="inline-block animate-bounce">
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
