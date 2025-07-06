'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Info, Briefcase, Mail, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Links for the center of the navbar
  const navLinks = [
    { href: '/about', label: 'About', icon: <Info size={20} /> },
    { href: '/services', label: 'Services', icon: <Briefcase size={20} /> },
  ];
  
  // All links for the mobile menu
  const mobileNavLinks = [
    ...navLinks,
    { href: '/contact', label: 'Contact', icon: <Mail size={20} /> },
  ]

  return (
    <nav className="bg-gray-900 text-white shadow-lg font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          {/* Left Section: Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="flex-shrink-0">
                <Image src="/logos/logo1.png" alt="MyWebsite Logo" width={150} height={50} />
            </Link>
          </div>

          {/* Centered Desktop Navigation */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
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
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-bold transition-opacity hover:opacity-80"
                style={{ backgroundColor: '#4c8ac9' }}
              >
                <Mail size={20} />
                <span>Contact</span>
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button
                onClick={toggleMenu}
                type="button"
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
