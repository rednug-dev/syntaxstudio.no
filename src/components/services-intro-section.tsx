'use client';

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Zap, Shield, Rocket, Cloud, Code2 } from "lucide-react";
import {Link} from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

// id -> icon map
const ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  ai: Bot,
  fast: Zap,
  security: Shield,
  scale: Rocket,
  cloud: Cloud,
  dev: Code2
};

type Feature = { id: keyof typeof ICONS; badgeKey?: string; href?: string };

const FEATURES: Feature[] = [
  { id: 'ai',       badgeKey: 'new', href: '#automation' },
  { id: 'fast',                       href: '#performance' },
  { id: 'security',                   href: '#security' },
  { id: 'scale',                      href: '#scale' },
  { id: 'cloud',                      href: '#cloud' },
  { id: 'dev',                        href: '#developer-first' },
];

const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } } };

function FeatureCard({ id, badgeKey, href }: Feature) {
  const t = useTranslations('Services');
  const Icon = ICONS[id];
  return (
    <motion.div variants={item} whileHover={{ y: -4 }}>
      <Card className="relative h-full rounded-2xl border bg-card/80 shadow-sm transition-shadow hover:shadow-md">
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted">
            <Icon className="h-5 w-5" />
          </div>
          {badgeKey && <Badge className="rounded-full px-2.5 py-0.5 text-[11px]">{t(`badges.${badgeKey}`)}</Badge>}
        </CardHeader>
        <CardContent className="pt-0">
          <CardTitle className="text-xl">{t(`features.${id}.title`)}</CardTitle>
          <CardDescription className="mt-2 text-base">{t(`features.${id}.desc`)}</CardDescription>
          <div className="mt-6 flex items-center justify-end" />
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ServicesIntroSection() {
  const t = useTranslations('Services');
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
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
          viewport={{ once: true, amount: 0.6 }}
          className="mt-3 text-base text-muted-foreground"
        >
          {t('subtitle')}
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
          <FeatureCard key={f.id} {...f} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mt-10 flex justify-center"
      >
        <Button size="lg" className="gap-2" asChild>
          <Link href="/pricing">{t('cta')}</Link>
        </Button>
      </motion.div>
    </section>
  );
}
