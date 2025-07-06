'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Info, Briefcase, Mail, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration.
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/om-oss', label: 'Om oss', icon: <Info size={20} /> },
    { href: '/tjenester', label: 'Tjenester', icon: <Briefcase size={20} /> },
  ];

  // All links for the mobile menu
  const mobileNavLinks = [
    ...navLinks,
    { href: '/contact', label: 'Kontakt', icon: <Mail size={20} /> },
  ];

  const SkeletonLoader = () => (
    <div className="bg-gray-900 text-white shadow-lg font-sans animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="h-8 bg-gray-700 rounded w-36"></div>
          <div className="hidden lg:flex items-baseline space-x-6">
            <div className="h-6 bg-gray-700 rounded w-24"></div>
            <div className="h-6 bg-gray-700 rounded w-24"></div>
          </div>
          <div className="h-10 bg-gray-700 rounded w-28 hidden sm:flex"></div>
          <div className="h-10 w-10 bg-gray-700 rounded lg:hidden"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <nav className="bg-gray-900 text-white shadow-lg font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          {/* Left Section: Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="flex-shrink-0">
              <Image src="/logos/logo1.png" alt="MyWebsite Logo" width={150} height={40} />
            </Link>
          </div>

          {/* Centered Desktop Navigation */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex">
            <div className="flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-bold hover:bg-gray-700 transition-colors"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section: CTA Button & Mobile Menu Button */}
          <div className="flex-1 flex items-center justify-end">
            {/* CTA Button */}
            <div className="hidden sm:block">
              <Link
                href="/contact"
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-bold transition-opacity hover:opacity-80"
                style={{ backgroundColor: '#4c8ac9' }}
              >
                <Mail size={20} />
                <span>Kontakt</span>
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center ml-4">
              <button
                onClick={toggleMenu}
                type="button"
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden absolute top-20 left-0 w-full bg-gray-900 z-50`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {mobileNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-bold hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
           <div className="sm:hidden pt-4 pb-2 border-t border-gray-700">
             <Link
                href="/contact"
                className="flex items-center justify-center space-x-2 w-full px-4 py-2 rounded-md text-sm font-bold text-white"
                style={{ backgroundColor: '#4c8ac9' }}
                onClick={() => setIsOpen(false)}
              >
                <Mail size={20} />
                <span>Kontakt</span>
              </Link>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;