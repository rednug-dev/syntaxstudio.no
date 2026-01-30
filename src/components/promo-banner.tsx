'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function PromoBanner() {
  const t = useTranslations('PromoBanner');
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner in this session
    const dismissed = sessionStorage.getItem('promo-dismissed');
    if (dismissed) {
      setIsVisible(false);
    }

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('promo-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="promo-banner"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`
            sticky top-0 z-[60] w-full overflow-hidden
            bg-gradient-to-r from-primary via-primary/90 to-primary
            text-primary-foreground
          `}
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[10px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse" />
          </div>

          <div className="relative container mx-auto px-4 py-2 sm:py-3">
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-center pr-8">
              {/* Logo - hidden on mobile */}
              <div className="relative flex-shrink-0 hidden sm:block">
                <Image
                  src="/wb1.png"
                  alt="Syntax Studio"
                  width={64}
                  height={64}
                  quality={100}
                  unoptimized
                  className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
                />
              </div>

              <div className="flex flex-row items-center gap-1.5 sm:gap-3 flex-wrap justify-center">
                <span className="text-xs sm:text-base font-medium whitespace-nowrap">
                  {t('headline')}
                </span>
                
                {/* Price highlight */}
                <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-bold">
                  <span className="line-through opacity-70 text-[10px] sm:text-xs">{t('originalPrice')}</span>
                  <span className="text-sm sm:text-lg">{t('salePrice')}</span>
                </span>

                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold underline underline-offset-4 hover:no-underline transition-all group whitespace-nowrap"
                >
                  {t('cta')}
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition-colors"
                aria-label={t('dismiss')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bottom shimmer effect */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
