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
