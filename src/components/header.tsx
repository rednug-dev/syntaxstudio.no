'use client';

import Link from "next/link";
import { Button } from "./ui/button";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { Briefcase, Users } from 'lucide-react';

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-transform duration-300",
      isHidden ? "-translate-y-full" : "translate-y-0",
      "bg-background/80 backdrop-blur-sm border-b"
    )}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline">
            <Image src="/logosyntax-nbnm.png" alt="Syntax Studio logo" width={150} height={40} />
          </Link>
        </div>
        <nav className="hidden md:flex flex-1 justify-center items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/tjenester" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Tjenester
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/om-oss" className="flex items-center gap-2">
              <Users className="w-4 h-4" /> Om oss
            </Link>
          </Button>
        </nav>
        <div className="flex-1 flex justify-end">
          <Button asChild>
            <Link href="#proposal">Kontakt oss</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
