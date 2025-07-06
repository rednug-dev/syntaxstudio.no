'use client';

import Link from "next/link";
import { Button } from "./ui/button";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { Briefcase, Users, Menu, X } from 'lucide-react';

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect to handle showing/hiding the header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsHidden(false);
        return;
      }
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
  }, [lastScrollY, isMenuOpen]);

  // Effect to close the mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // Tailwind's 'lg' breakpoint
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: '/tjenester', label: 'Tjenester', icon: <Briefcase className="w-5 h-5" /> },
    { href: '/om-oss', label: 'Om oss', icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-transform duration-300",
        isHidden ? "-translate-y-full" : "translate-y-0",
        "bg-background/80 backdrop-blur-sm border-b"
      )}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Left Section: Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
              <Image src="/logosyntax-nbnm.png" alt="Syntax Studio logo" width={150} height={40} priority />
            </Link>
          </div>

          {/* Center Section: Desktop Nav */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-2">
            {navLinks.map(link => (
              <Button variant="ghost" asChild key={link.href}>
                <Link href={link.href} className="flex items-center gap-2 text-md">
                  {React.cloneElement(link.icon, { className: "w-4 h-4" })}
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
          
          {/* Right Section: CTA & Mobile Menu Button */}
          <div className="flex-1 flex justify-end items-center">
            <div className="hidden sm:block">
                <Button asChild>
                    <Link href="#proposal">Kontakt oss</Link>
                </Button>
            </div>
            <div className="lg:hidden ml-2">
              <Button onClick={toggleMenu} variant="ghost" size="icon" aria-label="Open menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "lg:hidden fixed inset-0 top-20 z-40 bg-background/95 backdrop-blur-sm transition-opacity duration-300",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
      >
        <div className="container mx-auto px-8 pt-8 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-lg font-semibold flex items-center gap-3 p-3 hover:bg-muted rounded-lg"
            >
              {link.icon} 
              {link.label}
            </Link>
          ))}
          {/* CTA Button for mobile */}
          <div className="sm:hidden mt-4">
            <Button asChild className="w-full">
              <Link href="#proposal">Kontakt oss</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}