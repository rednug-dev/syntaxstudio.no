import type {Metadata} from 'next';
import {Inter, Space_Grotesk} from 'next/font/google';
import Script from 'next/script';
import {Toaster} from '@/components/ui/toaster';
import {cn} from '@/lib/utils';
import FloatingLocaleSwitch from '@/components/floating-locale-switch';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { PreloaderProvider } from '@/components/ui/asset-preloader';
import 'flag-icons/css/flag-icons.min.css';

import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import type {Locale} from 'next-intl';

import '../globals.css';

const inter = Inter({subsets: ['latin'], variable: '--font-inter', display: 'swap'});
const spaceGrotesk = Space_Grotesk({subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap'});

const SITE_URL = 'https://syntaxstudio.no';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Syntax Studio',
    default: 'Syntax Studio – nettsider, video og markedsføring',
  },
  description: 'Vi tar oss av nettside, kampanjer og videoproduksjon for små og mellomstore bedrifter. Én partner, hele leveransen.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/logos/syntax-i-32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logos/syntax-i-180.png',
  },
  openGraph: {
    siteName: 'Syntax Studio',
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Syntax Studio',
  url: SITE_URL,
  logo: `${SITE_URL}/logos/syntax-i.webp`,
  description: 'Markedsføringspartner for nettsider, video og kampanjer.',
  email: 'gunder@syntaxstudio.no',
  telephone: '+47 94 44 33 55',
  areaServed: 'NO',
  founder: {
    '@type': 'Person',
    name: 'Gunder Rollufson',
  },
  sameAs: [
    'https://www.instagram.com/syntaxstudio.no/',
    'https://www.tiktok.com/@syntaxstudio.no',
    'https://www.linkedin.com/company/syntax-studio-no/',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'gunder@syntaxstudio.no',
      telephone: '+47 94 44 33 55',
      areaServed: 'NO',
      availableLanguage: ['Norwegian', 'English'],
    },
  ],
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}#business`,
  name: 'Syntax Studio',
  url: SITE_URL,
  image: `${SITE_URL}/logos/syntax-i.webp`,
  description: 'Nettsider, videoproduksjon, markedsføring, foto og grafisk design.',
  email: 'gunder@syntaxstudio.no',
  telephone: '+47 94 44 33 55',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Heimdalsgata 34B',
    postalCode: '0561',
    addressLocality: 'Oslo',
    addressCountry: 'NO',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Norway',
  },
  sameAs: [
    'https://www.instagram.com/syntaxstudio.no/',
    'https://www.tiktok.com/@syntaxstudio.no',
    'https://www.linkedin.com/company/syntax-studio-no/',
  ],
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
        <Script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={cn('font-body antialiased', inter.variable, spaceGrotesk.variable)}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <Toaster />
          <FloatingLocaleSwitch />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
