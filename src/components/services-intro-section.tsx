"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  Rocket,
  Cloud,
  Code2,
} from "lucide-react";

// ---- Types ----
interface Feature {
  title: string;
  description: string;
  href?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string;
}

// ---- Copy tailored to Syntax Studio ----
const FEATURES: Feature[] = [
  {
    title: "AI‑Powered Automation",
    description:
      "Automate content, ops and support with practical ML that fits your stack.",
    icon: Bot,
    badge: "New",
    href: "#automation",
  },
  {
    title: "Lightning Fast",
    description:
      "Hand‑coded frontends optimized for sub‑second interactions and Core Web Vitals.",
    icon: Zap,
    href: "#performance",
  },
  {
    title: "Enterprise‑Grade Security",
    description: "Bank‑level practices: encryption, least‑privilege, and secure workflows.",
    icon: Shield,
    href: "#security",
  },
  {
    title: "Scalable Infrastructure",
    description: "Built to grow—edge rendering, queues, background jobs and observability.",
    icon: Rocket,
    href: "#scale",
  },
  {
    title: "Cloud Native",
    description: "Deploy anywhere: Vercel, Fly, AWS, or your own cloud‑native platform.",
    icon: Cloud,
    href: "#cloud",
  },
  {
    title: "Developer‑First",
    description:
      "Clean architecture, docs and DX so your team can iterate with confidence.",
    icon: Code2,
    href: "#developer-first",
  },
];

// ---- Animations ----
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <motion.div variants={item} whileHover={{ y: -4 }}>
      <Card className="relative h-full rounded-2xl border bg-card/80 shadow-sm transition-shadow hover:shadow-md">
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted">
            <Icon className="h-5 w-5" />
          </div>
          {feature.badge && <Badge className="rounded-full px-2.5 py-0.5 text-[11px]">{feature.badge}</Badge>}
        </CardHeader>
        <CardContent className="pt-0">
          <CardTitle className="text-xl">{feature.title}</CardTitle>
          <CardDescription className="mt-2 text-base">{feature.description}</CardDescription>
          <div className="mt-6 flex items-center justify-end">
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ServicesIntroSection() {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.6 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Features that set us apart
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
          viewport={{ once: true, amount: 0.6 }}
          className="mt-3 text-base text-muted-foreground"
        >
          Everything you need for modern, custom‑coded websites—built by engineers, designed for growth.
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mt-10 flex justify-center"
      >
        <Button size="lg" className="gap-2">
          <a href="/pris">Get Started Now</a><ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
}
