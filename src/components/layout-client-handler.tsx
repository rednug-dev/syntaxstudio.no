'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"; // Importer Toaster her

export default function LayoutClientHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          const headerOffset = 80; // Header-høyde
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [pathname]);

  return (
    <>
      {children}
      <Toaster /> {/* Plasser Toaster her */}
    </>
  );
}