import type {Metadata} from 'next';
import {Inter, Space_Grotesk} from 'next/font/google';
import Script from 'next/script';
import {Toaster} from '@/components/ui/toaster';
import {cn} from '@/lib/utils';
import FloatingLocaleSwitch from '@/components/floating-locale-switch';
import { SpeedInsights } from "@vercel/speed-insights/next"
import 'flag-icons/css/flag-icons.min.css';

import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import type {Locale} from 'next-intl';

import '../globals.css';

const inter = Inter({subsets: ['latin'], variable: '--font-inter', display: 'swap'});
const spaceGrotesk = Space_Grotesk({subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap'});

export const metadata: Metadata = {
  title: 'Syntax Studio',
  description: 'Webdesign, merkevarebygging og automatisering',
  icons: {
    icon: '/logos/syntax-i.webp?v=2',
    shortcut: '/logos/syntax-i.webp?v=2',
    apple: '/logos/syntax-i.webp?v=2',
  },
};

export default async function RootLayout({
  children,
  // Mottar params som Promise og await
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: Locale}>;
}) {
  const {locale} = await params;

  // (next-intl) gjør locale tilgjengelig for server components
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth dark">
      <head>
        {/* GTM/Iubenda-scripts */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17330083087" />
        <Script id="google-analytics">{`/* ... */`}</Script>
        <Script id="iubenda-cs-config" type="text/javascript">{`/* ... */`}</Script>
        <Script type="text/javascript" src="https://cs.iubenda.com/autoblocking/4151649.js" />
        <Script type="text/javascript" src="//cdn.iubenda.com/cs/gpp/stub.js" />
        <Script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charSet="UTF-8" async />
      </head>
      <body className={cn('font-body antialiased', inter.variable, spaceGrotesk.variable)}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <Toaster />
          <FloatingLocaleSwitch />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
