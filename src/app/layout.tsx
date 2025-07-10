import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Analytics } from "@vercel/analytics/next"
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Syntax Studio',
  description: 'Webdesign, merkevarebygging og automatisering',
  icons: {
    icon: '/logos/syntax-i.webp?v=2',
    shortcut: '/logos/syntax-i.webp?v=2',
    apple: '/logos/syntax-i.webp?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className="scroll-smooth dark">
      <head>
        {/* Google Tag Manager */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17330083087"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17330083087');
          `}
        </Script>

        {/* Iubenda Cookie Solution */}
        <Script id="iubenda-cs-config" type="text/javascript">
          {`
            var _iub = _iub || [];
            _iub.csConfiguration = {
              "siteId": 4151649,
              "cookiePolicyId": 19330649,
              "lang": "no",
              "storage": { "useSiteId": true },
              "banner": {
                "position": "bottom",
                "acceptButtonDisplay": true,
                "customizeButtonDisplay": true,
                "explicitWithdrawal": true,
                "listPurposes": true,
                "backgroundColor": "#0A0A0A", // Dark background
                "textColor": "#FAFAFA", // Light text
                "acceptButtonColor": "#FFFFFF",
                "acceptButtonCaptionColor": "#0A0A0A",
                "customizeButtonColor": "transparent",
                "customizeButtonCaptionColor": "#FFFFFF",
                "rejectButtonColor": "transparent",
                "rejectButtonCaptionColor": "#A1A1AA"
              }
            };
          `}
        </Script>
        <Script type="text/javascript" src="https://cs.iubenda.com/autoblocking/4151649.js"></Script>
        <Script type="text/javascript" src="//cdn.iubenda.com/cs/gpp/stub.js"></Script>
        <Script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charSet="UTF-8" async></Script>
      </head>
      <body className={cn(
        "font-body antialiased",
        inter.variable,
        spaceGrotesk.variable
      )}>
        <Analytics />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
