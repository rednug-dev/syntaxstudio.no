'use client';

import { CodeXml } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline">
          <CodeXml className="w-8 h-8 text-primary" />
          Syntax Studio
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="#portfolio">Portefølje</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#about">Om oss</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#contact">Kontakt</Link>
          </Button>
        </nav>
        <Button asChild>
          <Link href="#proposal">Kontakt oss</Link>
        </Button>
      </div>
    </header>
  );
}
