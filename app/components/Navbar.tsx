"use client";

import React, { useState, useEffect } from "react";
import { Activity, Menu, X } from "lucide-react";
import Button from "./ui/Button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-[var(--shadow-sm)]"
          : "bg-transparent"
        }`}
    >
      <nav
        aria-label="Main Navigation"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group rounded-lg focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label="Page Pulse Home"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-600 text-white transition-transform duration-200 group-hover:scale-105 shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Page<span className="text-primary-600">Pulse</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 ">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-gray-600 rounded-lg transition-colors duration-200 hover:text-gray-900 hover:bg-gray-100/80 focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                {link.label}
              </a>
            ))}
          </div>


          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100/80 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isMobileMenuOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
            }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="flex flex-col gap-1.5 pt-3 border-t border-gray-100/80 bg-white/60 backdrop-blur-md rounded-b-2xl px-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-3 text-base font-medium text-gray-700 rounded-xl hover:text-gray-900 hover:bg-gray-100/80 active:bg-gray-200/80 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-gray-100">
              <a
                href="#"
                className="px-4 py-2.5 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Log in
              </a>
              <Button size="md" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
