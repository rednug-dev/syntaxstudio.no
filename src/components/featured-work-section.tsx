"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { VideoCard } from "@/components/work/video-card";
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
          <Link href="/work/jonk" className="block relative rounded-[2rem] overflow-hidden border border-white/5 shadow-xl aspect-[2/1]">
            <Image
              src="/webmat/oskarburgercrop.webp"
              alt="Jønk burger"
              fill
              sizes="75vw"
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <Image src="/logos/Jønksvg.svg" alt="Jønk" width={80} height={40} className="h-8 w-auto brightness-0 invert mb-1" />
              <p className="text-white/70 text-sm">{projects("jonk.heading")}</p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={item} className="row-span-2 relative group">
          <Link href="/work/jonk" className="block h-full">
            <VideoCard
              src="/webmat/oskarburger.mp4"
              poster="/webmat/oskarburger-poster.webp"
              aspectRatio="vertical"
              objectPosition="center"
              alwaysPlay
              className="w-full h-full !rounded-[2rem]"
            />
          </Link>
        </motion.div>

        {/* Row 2: jonkfries + p3.1 + gatebok (3 cells under hero, beside vertical video) */}
        <motion.div variants={item} className="relative group">
          <Link href="/work/jonk" className="block relative rounded-[2rem] overflow-hidden border border-white/5 bg-black shadow-xl aspect-square">
            <VideoCard
              src="/jønk/jonkfries_square.mp4"
              aspectRatio="square"
              objectPosition="center"
              alwaysPlay
              className="w-full h-full !rounded-[2rem] !border-none !shadow-none"
            />
          </Link>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <Link href="/work/jonk" className="block relative rounded-[2rem] overflow-hidden border border-white/5 shadow-xl aspect-square">
            <Image src="/webmat/p3_1.webp" alt="Jønk chicken wings reklameplakat" fill sizes="25vw" className="object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-700" />
          </Link>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <Link href="/work/jonk" className="block relative rounded-[2rem] overflow-hidden border border-white/5 shadow-xl aspect-square">
            <Image src="/webmat/gatebok_cf.webp" alt="Gatebok" fill sizes="25vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
          </Link>
        </motion.div>

        {/* Row 3: FCR (2 col) + Snatched (2 col) */}
        <motion.div variants={item} className="col-span-2 relative group">
          <Link href="/work/fcr" className="block relative rounded-[2rem] overflow-hidden border border-white/5 bg-black shadow-xl aspect-[2/1]">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-700">
              <Image src="/logos/FCRNM.svg" alt="FCR" width={60} height={60} className="h-16 w-auto brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
              <p className="text-white/50 text-sm font-medium">{projects("fcr.heading")}</p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={item} className="col-span-2 relative group">
          <Link href="/work/snatched" className="block relative rounded-[2rem] overflow-hidden border border-white/5 bg-black shadow-xl aspect-[2/1]">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-700">
              <Image src="/logos/Snatched.svg" alt="Snatched" width={120} height={30} className="h-8 w-auto brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
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
          <Link href="/work/jonk" className="block relative rounded-2xl overflow-hidden border border-white/5 shadow-xl aspect-[2/1]">
            <Image
              src="/webmat/oskarburgercrop.webp"
              alt="Jønk burger"
              fill
              sizes="100vw"
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <Image src="/logos/Jønksvg.svg" alt="Jønk" width={80} height={40} className="h-6 w-auto brightness-0 invert mb-1" />
              <p className="text-white/70 text-xs">{projects("jonk.heading")}</p>
            </div>
          </Link>
        </motion.div>

        {/* Two vertical videos side by side */}
        <motion.div variants={item} className="relative group">
          <Link href="/work/jonk">
            <VideoCard
              src="/jønk/burgers_vertical.mp4"
              aspectRatio="vertical"
              objectPosition="center"
              className="w-full !rounded-2xl"
            />
          </Link>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <Link href="/work/jonk">
            <VideoCard
              src="/webmat/oskarburger.mp4"
              poster="/webmat/oskarburger-poster.webp"
              aspectRatio="vertical"
              objectPosition="center"
              className="w-full !rounded-2xl"
            />
          </Link>
        </motion.div>

        {/* FCR + Snatched */}
        <motion.div variants={item} className="relative group">
          <Link href="/work/fcr" className="block relative rounded-2xl overflow-hidden border border-white/5 bg-black shadow-xl aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-700">
              <Image src="/logos/FCRNM.svg" alt="FCR" width={60} height={60} className="h-10 w-auto brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
              <p className="text-white/50 text-[11px] font-medium">{projects("fcr.heading")}</p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <Link href="/work/snatched" className="block relative rounded-2xl overflow-hidden border border-white/5 bg-black shadow-xl aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-700">
              <Image src="/logos/Snatched.svg" alt="Snatched" width={100} height={30} className="h-6 w-auto brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
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
