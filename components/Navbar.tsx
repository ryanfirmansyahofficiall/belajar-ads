'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/lib/routes';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Globe 
} from 'lucide-react';

interface NavbarProps {
  visibilities?: Record<string, boolean>;
}

export function Navbar({ visibilities }: NavbarProps) {
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navItems = siteConfig.getNavItems(locale, visibilities);

  const toggleLanguage = () => {
    setLocale(locale === 'id' ? 'en' : 'id');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-bg/95 backdrop-blur-md border-b border-dark-border py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href={ROUTES.HOME} className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center font-black text-white text-base tracking-tighter shadow-lg shadow-brand/30 group-hover:scale-105 transition-transform">
                BA
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Belajar<span className="text-brand">Ads</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                if (item.subItems) {
                  return (
                    <div
                      key={item.label}
                      className="relative group"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg transition-colors group-hover:text-brand"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 w-64 pt-2 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
                        <div className="bg-dark-card border border-dark-border rounded-xl p-2 shadow-2xl shadow-black/80 backdrop-blur-xl">
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                            >
                              <div className="text-sm font-medium text-gray-200 hover:text-brand transition-colors">
                                {sub.label}
                              </div>
                              {sub.desc && (
                                <div className="text-xs text-gray-400 mt-0.5">{sub.desc}</div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-brand font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Actions: Simplified Header (Only Language Switcher) */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-dark-border hover:border-gray-600 bg-dark-card/60 text-gray-300 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                title={locale === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              >
                <Globe className="w-3.5 h-3.5 text-brand" />
                <span className={locale === 'id' ? 'text-brand font-bold' : 'text-gray-400'}>ID</span>
                <span className="text-gray-600">|</span>
                <span className={locale === 'en' ? 'text-brand font-bold' : 'text-gray-400'}>EN</span>
              </button>
            </div>

            {/* Mobile / Tablet Right Bar: Language Switcher + Hamburger Trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-dark-border bg-dark-card text-gray-300 hover:text-white transition-colors"
                title={locale === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              >
                <Globe className="w-3 h-3 text-brand" />
                <span className={locale === 'id' ? 'text-brand font-bold' : 'text-gray-400'}>ID</span>
                <span className="text-gray-600">|</span>
                <span className={locale === 'en' ? 'text-brand font-bold' : 'text-gray-400'}>EN</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-brand/40"
                aria-label={locale === 'id' ? 'Buka navigasi menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Full-Screen Fixed Viewport Overlay */}
      {mounted && mobileMenuOpen && createPortal(
        <div
          id="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={locale === 'id' ? 'Navigasi Menu' : 'Navigation Menu'}
          className="fixed inset-0 z-[100] bg-[#0A0B0E] flex flex-col text-gray-100 transition-opacity duration-200"
        >
          {/* Top Header Bar inside Overlay (consistent alignment with navbar) */}
          <div className="h-16 sm:h-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] flex items-center justify-between flex-shrink-0 bg-[#0A0B0E]">
            {/* Brand Logo */}
            <Link
              href={ROUTES.HOME}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center font-black text-white text-base tracking-tighter shadow-lg shadow-brand/30">
                BA
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Belajar<span className="text-brand">Ads</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              </span>
            </Link>

            {/* Header Right Actions: Language Switcher + Close Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-dark-border bg-dark-card/80 text-gray-300 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                title={locale === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              >
                <Globe className="w-3.5 h-3.5 text-brand" />
                <span className={locale === 'id' ? 'text-brand font-bold' : 'text-gray-400'}>ID</span>
                <span className="text-gray-600">|</span>
                <span className={locale === 'en' ? 'text-brand font-bold' : 'text-gray-400'}>EN</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-1 focus:ring-brand/40"
                aria-label={locale === 'id' ? 'Tutup navigasi' : 'Close navigation menu'}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Internal Scrollable Navigation Body (Locked body outside, scrollable inside) */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-10 py-8 max-w-3xl mx-auto w-full flex flex-col justify-between">
            {/* Editorial Navigation List */}
            <nav className="space-y-6">
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href || (item.subItems && item.subItems.some(s => pathname === s.href));
                const indexStr = String(idx + 1).padStart(2, '0');

                return (
                  <div key={item.label} className="pb-6 border-b border-white/[0.06] last:border-b-0">
                    {/* Parent Navigation Item */}
                    <div className="flex items-baseline justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group inline-flex items-baseline gap-3.5 text-2xl sm:text-3xl font-black tracking-tight transition-colors ${
                          isActive ? 'text-brand' : 'text-white hover:text-brand'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold text-brand/70 tracking-widest uppercase">
                          {indexStr}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    </div>

                    {/* Sub Navigation Items (Indented, smaller, secondary hierarchy) */}
                    {item.subItems && (
                      <div className="mt-3.5 ml-8 pl-4 border-l border-white/[0.08] space-y-2.5">
                        {item.subItems.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`block py-1 text-sm sm:text-base transition-all ${
                                isSubActive
                                  ? 'text-brand font-semibold translate-x-1'
                                  : 'text-gray-400 hover:text-white hover:translate-x-1 font-medium'
                              }`}
                            >
                              <span>{sub.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Subtle Editorial Footer Note */}
            <div className="pt-8 mt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-gray-500">
              <span>Belajar Ads — Performance Marketing Education</span>
              <Link
                href={ROUTES.CONTACT}
                onClick={() => setMobileMenuOpen(false)}
                className="text-brand hover:underline font-semibold"
              >
                {locale === 'id' ? 'Hubungi Kami →' : 'Contact Support →'}
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

