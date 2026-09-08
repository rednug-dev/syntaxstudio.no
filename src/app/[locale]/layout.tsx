import type {Metadata, Viewport} from 'next';
import {DM_Sans, Inter, Space_Grotesk} from 'next/font/google';
import {Toaster} from '@/components/ui/toaster';
import {cn} from '@/lib/utils';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import type {Locale} from 'next-intl';

import '../globals.css';
import '../house.css';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const houseFont = DM_Sans({subsets: ['latin'], variable: '--font-house', display: 'swap'});
const inter = Inter({subsets: ['latin'], variable: '--font-inter', display: 'swap', preload: false});
const spaceGrotesk = Space_Grotesk({subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap', preload: false});

const SITE_URL = 'https://syntaxstudio.no';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Syntax Studio',
    default: 'Syntax Studio – et uavhengig kreativt hus',
  },
  description: 'Tre spesialister. Ett kreativt hus i Oslo. ISO400 for bilde og design, 35mm for film og VFX, Nyfane for teknologi.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/logos/syntax-icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logos/syntax-icon-180.png',
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
  logo: `${SITE_URL}/logos/syntax-icon-512.png`,
  description: 'Et uavhengig kreativt hus for bilde, film og teknologi.',
  email: 'gunder@syntaxstudio.no',
  telephone: '+47 94 44 33 55',
  areaServed: 'NO',
  founder: ['Gunder Rollufson', 'Khamzat Dudaev', 'Rasul Uzdijev'].map(name => ({'@type': 'Person', name})),
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
  image: `${SITE_URL}/logos/syntax-icon-512.png`,
  description: 'Bilde og design, film og VFX, teknologi. Tre selvstendige praksiser, ett kreativt hus.',
  email: 'gunder@syntaxstudio.no',
  telephone: '+47 94 44 33 55',
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
  if (!hasLocale(routing.locales, locale)) notFound();

  // (next-intl) gjør locale tilgjengelig for server components
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          id="ld-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={cn('antialiased', houseFont.variable, inter.variable, spaceGrotesk.variable)}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {themeColor: '#e9e7e2', width: 'device-width', initialScale: 1};
