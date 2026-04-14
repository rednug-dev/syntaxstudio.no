'use client';

import {Link} from '@/i18n/navigation';
import { Button } from "./ui/button";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { Briefcase, Users, Menu, X, Calendar, Mail, ChevronDown, Newspaper } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) { setIsHidden(false); return; }
      const currentScrollY = window.scrollY;
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen]);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setIsMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const contactRef = React.useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setIsContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/services',   label: t('showcase'), icon: <Briefcase className="w-5 h-5" /> },
    { href: '/about-us',   label: t('about'),    icon: <Users className="w-5 h-5" /> },
    ...(locale === 'no'
      ? [{ href: '/blog', label: 'Blogg', icon: <Newspaper className="w-5 h-5" /> }]
      : []),
  ];

  return (
    <>
      <a href="#main-content" className="sr-only">
        Skip to content
      </a>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-transform duration-300",
        isHidden ? "-translate-y-full" : "translate-y-0",
        "bg-background/80 backdrop-blur-sm border-b"
      )}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
              <Image src="/logosyntax-nbnm.png" alt="Syntax Studio logo" width={150} height={40} priority />
            </Link>
          </div>

          {/* Center: Desktop Nav */}
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

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex-1 flex justify-end items-center">
            <div className="hidden sm:block relative" ref={contactRef}>
              <Button
                onClick={() => setIsContactOpen(!isContactOpen)}
                className={cn(isContactOpen && "rounded-b-none")}
              >
                {t('contact')}
                <ChevronDown className={cn("ml-1.5 h-4 w-4 transition-transform", isContactOpen && "rotate-180")} />
              </Button>
              <div className={cn(
                "absolute right-0 top-full w-full rounded-b-md border border-t-0 border-primary bg-primary text-primary-foreground overflow-hidden transition-all duration-200 origin-top",
                isContactOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
              )}>
                <Link
                  href="/book"
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium hover:bg-primary-foreground/10 transition-colors"
                  onClick={() => setIsContactOpen(false)}
                >
                  <Calendar className="h-4 w-4" />
                  {t('bookCall')}
                </Link>
                <Link
                  href="/#proposal"
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium hover:bg-primary-foreground/10 transition-colors"
                  onClick={() => setIsContactOpen(false)}
                >
                  <Mail className="h-4 w-4" />
                  {t('sendEmail')}
                </Link>
              </div>
            </div>
            <div className="lg:hidden ml-2">
              <Button onClick={toggleMenu} variant="ghost" size="icon" aria-label="Open menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 bottom-0 top-20 z-40 bg-background/95 backdrop-blur-sm transition-opacity duration-300",
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
              {link.icon}{link.label}
            </Link>
          ))}
          <div className="mt-4 space-y-2">
            <Link
              href="/book"
              className="text-lg font-semibold flex items-center gap-3 p-3 hover:bg-muted rounded-lg"
            >
              <Calendar className="w-5 h-5" />{t('bookCall')}
            </Link>
            <Link
              href="/#proposal"
              className="text-lg font-semibold flex items-center gap-3 p-3 hover:bg-muted rounded-lg"
            >
              <Mail className="w-5 h-5" />{t('sendEmail')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
