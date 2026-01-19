'use client';

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, Globe, BarChart3, TrendingUp, Mail, PenTool } from "lucide-react";
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

// id -> icon map
const ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  ai: Megaphone,     // Markedsføring som virker
  fast: Globe,       // Nettsider som konverterer
  security: BarChart3, // Måling og rapportering
  scale: TrendingUp, // Vekst og rådgivning
  cloud: Mail,       // Profesjonell e-post
  dev: PenTool       // Alt skreddersydd
};

type Feature = { id: keyof typeof ICONS; badgeKey?: string; href?: string };

const FEATURES: Feature[] = [
  { id: 'ai',       badgeKey: 'new', href: '#marketing' },
  { id: 'fast',                      href: '#websites' },
  { id: 'security',                  href: '#tracking' },
  { id: 'scale',                     href: '#growth' },
  { id: 'cloud',                     href: '#email' },
  { id: 'dev',                       href: '#custom' }
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" }
  }
};

function FeatureCard({ id, badgeKey }: Feature) {
  const t = useTranslations('Services');
  const Icon = ICONS[id];
  return (
    <motion.div variants={item} whileHover={{ y: -4 }}>
      <Card className="relative h-full rounded-2xl border bg-card/80 shadow-sm transition-shadow hover:shadow-md">
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted">
            <Icon className="h-5 w-5" />
          </div>
          {badgeKey && (
            <Badge className="rounded-full px-2.5 py-0.5 text-[11px]">
              {t(`badges.${badgeKey}`)}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          <CardTitle className="text-xl">
            {t(`features.${id}.title`)}
          </CardTitle>
          <CardDescription className="mt-2 text-base">
            {t(`features.${id}.desc`)}
          </CardDescription>
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
