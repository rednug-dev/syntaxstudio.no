'use client';

import * as React from 'react';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';

export default function FloatingLocaleSwitch() {
  const locale = useLocale();                 // 'no' | 'en'
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === 'no' ? 'en' : 'no';
  const [pending, startTransition] = React.useTransition();

  // flag-icons bruker ISO-koder: Norge = 'no', Storbritannia = 'gb'
  const code = next === 'no' ? 'no' : 'gb';
  const aria = locale === 'no' ? 'Bytt språk til engelsk' : 'Switch language to Norwegian';

  const onToggle = () => {
    startTransition(() => router.replace(pathname, {locale: next}));
  };

  return (
    <button
      onClick={onToggle}
      aria-label={aria}
      disabled={pending}
      className="fixed bottom-4 left-4 z-50 rounded-full border bg-background/80 backdrop-blur
                 supports-[backdrop-filter]:bg-background/60 shadow-lg ring-1 ring-black/5
                 transition hover:shadow-xl focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-primary"
    >
      {/* Beholderen sørger for perfekt sentering */}
      <span className="grid place-items-center rounded px-4 py-2">
        {/* fi + fi-<code> + fis (kvadratisk). font-size styrer størrelsen */}
        <span className={`fi fi-${code} fis text-[24px]`} />
      </span>
    </button>
  );
}