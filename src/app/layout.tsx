import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
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