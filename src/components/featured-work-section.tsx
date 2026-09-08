"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { VideoCard } from "@/components/work/video-card";
import { ToriiSun } from "@/components/work/tokyo-lockup";
import Image from "next/image";
import { useTranslations } from "next-intl";

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function FeaturedWorkSection() {
  const t = useTranslations("FeaturedWork");
  const projects = useTranslations("About.WorkIntro.projects");

  return (
    <section id="work" className="container mx-auto max-w-6xl px-4 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-4xl font-bold tracking-tight sm:text-5xl text-center mb-12"
      >
        {t("title")}
      </motion.h2>

      {/* ========== DESKTOP LAYOUT ========== */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        transition={{ staggerChildren: 0.08 }}
        className="hidden md:grid grid-cols-4 gap-4"
      >
        {/* Row 1: Wide burger (3 col) + vertical video (1 col, 2 rows) */}
        <motion.div variants={item} className="col-span-3 relative group">
          <Link href="/work/burger" className="block relative rounded-[2rem] overflow-hidden border border-white/5 shadow-xl aspect-[2/1]">
            <Image
              src="/webmat/burgercrop.webp"
              alt={t("alt.burgerHero")}
              fill
              sizes="75vw"
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </Link>
        </motion.div>

        <motion.div variants={item} className="row-span-2 relative group">
          <Link href="/work/burger" className="block h-full">
            <VideoCard
              src="/webmat/burger-vertical.mp4"
              poster="/webmat/burger-vertical-poster.webp"
              aspectRatio="vertical"
              objectPosition="center"
              alwaysPlay
              className="w-full h-full !rounded-[2rem]"
            />
          </Link>
        </motion.div>

        {/* Row 2: fries film + wings poster + product shot (3 cells under hero, beside vertical film) */}
        <motion.div variants={item} className="relative group">
          <Link href="/work/burger" className="block relative rounded-[2rem] overflow-hidden border border-white/5 bg-black shadow-xl aspect-square">
            <VideoCard
              src="/burger/fries-loaded.mp4"
              aspectRatio="square"
              objectPosition="center"
              alwaysPlay
              className="w-full h-full !rounded-[2rem] !border-none !shadow-none"
            />
          </Link>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <Link href="/work/burger" className="block relative rounded-[2rem] overflow-hidden border border-white/5 shadow-xl aspect-square">
            <Image src="/webmat/p3_1.webp" alt={t("alt.burgerWings")} fill sizes="25vw" className="object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-700" />
          </Link>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <Link href="/work/burger" className="block relative rounded-[2rem] overflow-hidden border border-white/5 shadow-xl aspect-square">
            <Image src="/webmat/prophoto_sq.webp" alt={t("alt.burgerProduct")} fill sizes="25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </Link>
        </motion.div>

        {/* Row 3: Syntax × Tokyo (2 col) + Snatched (2 col) */}
        <motion.div variants={item} className="col-span-2 relative group">
          <Link
            href="/work/tokyo"
            aria-label={t("alt.tokyo")}
            className="block relative rounded-[2rem] overflow-hidden aspect-[2/1] border border-[#e0483d]/40 transition-all [transition-duration:400ms] hover:-translate-y-[3px] hover:border-white/[0.22]"
            style={{
              background: "radial-gradient(135% 90% at 50% -12%, #27272b 0%, #161618 62%)",
              boxShadow: "0 20px 44px -22px rgba(0,0,0,.62), 0 24px 54px -22px rgba(224,72,61,.35)",
            }}
          >
            <div className="absolute inset-0 flex items-center gap-8 px-9">
              <ToriiSun scale={0.92} className="shrink-0" />
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-[9.5px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap rounded-full px-2.5 py-1 border border-[#e0483d]/50 bg-[#e0483d]/[0.12] text-[#f3897d]">
                    {projects("tokyo.card.new")}
                  </span>
                  {(projects.raw("tokyo.card.tags") as string[]).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9.5px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap rounded-full px-2.5 py-1 border border-white/[0.12] bg-white/[0.045] text-white/[0.72]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-headline text-[22px] font-bold tracking-[-0.01em] leading-[1.15] text-white">
                  {projects("tokyo.card.title")}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.62] text-white/[0.52] max-w-[286px] [text-wrap:pretty]">
                  {projects("tokyo.card.body")}
                </p>
                <span className="mt-4 inline-flex rounded-full border border-white/[0.26] px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#141416]">
                  {projects("tokyo.card.cta")}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={item} className="col-span-2 relative group">
          <Link href="/work/snatched" className="block relative rounded-[2rem] overflow-hidden border border-white/5 bg-black shadow-xl aspect-[2/1]">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-700">
              <Image src="/logos/Snatched.svg" alt={t("alt.snatchedLogo")} width={120} height={30} className="h-8 w-auto brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
              <p className="text-white/50 text-sm font-medium">{projects("snatched.heading")}</p>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* ========== MOBILE LAYOUT ========== */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        transition={{ staggerChildren: 0.08 }}
        className="md:hidden grid grid-cols-2 gap-3"
      >
        {/* Wide burger hero */}
        <motion.div variants={item} className="col-span-2 relative group">
          <Link href="/work/burger" className="block relative rounded-2xl overflow-hidden border border-white/5 shadow-xl aspect-[2/1]">
            <Image
              src="/webmat/burgercrop.webp"
              alt={t("alt.burgerHero")}
              fill
              sizes="100vw"
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </Link>
        </motion.div>

        {/* Two vertical videos side by side */}
        <motion.div variants={item} className="relative group">
          <Link href="/work/burger">
            <VideoCard
              src="/burger/hero-build.mp4"
              aspectRatio="vertical"
              objectPosition="center"
              className="w-full !rounded-2xl"
            />
          </Link>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <Link href="/work/burger">
            <VideoCard
              src="/webmat/burger-vertical.mp4"
              poster="/webmat/burger-vertical-poster.webp"
              aspectRatio="vertical"
              objectPosition="center"
              className="w-full !rounded-2xl"
            />
          </Link>
        </motion.div>

        {/* Syntax × Tokyo + Snatched */}
        <motion.div variants={item} className="relative group">
          <Link
            href="/work/tokyo"
            aria-label={t("alt.tokyo")}
            className="block relative rounded-2xl overflow-hidden aspect-square border border-[#e0483d]/40"
            style={{
              background: "radial-gradient(135% 90% at 50% -12%, #27272b 0%, #161618 62%)",
              boxShadow: "0 20px 44px -22px rgba(0,0,0,.62)",
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
              <ToriiSun scale={0.62} />
              <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.15em] rounded-full px-2 py-0.5 border border-[#e0483d]/50 bg-[#e0483d]/[0.12] text-[#f3897d]">
                {projects("tokyo.card.new")}
              </span>
              <h3 className="font-headline text-[13px] font-bold leading-[1.15] text-white">
                {projects("tokyo.card.title")}
              </h3>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <Link href="/work/snatched" className="block relative rounded-2xl overflow-hidden border border-white/5 bg-black shadow-xl aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-700">
              <Image src="/logos/Snatched.svg" alt={t("alt.snatchedLogo")} width={100} height={30} className="h-6 w-auto brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
              <p className="text-white/50 text-[11px] font-medium">{projects("snatched.heading")}</p>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* See all */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-10 flex justify-center"
      >
        <Button variant="outline" size="lg" className="gap-2" asChild>
          <Link href="/services">
            {t("seeAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
