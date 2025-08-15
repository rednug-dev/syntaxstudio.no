'use client';

import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveBackground } from "@/components/interactive-background";
import {Link} from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('Hero');
  const tNav = useTranslations('Nav');

  return (
    <section id="home" className="relative container mx-auto px-4 py-24 sm:py-32 text-center animate-fade-in-up">
      <InteractiveBackground />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline tracking-tighter">
          {t('title')}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/pricing">{tNav('pricing')}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/#proposal">
              {t('getInTouch')} <MoveRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
