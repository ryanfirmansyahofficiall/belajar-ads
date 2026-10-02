'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const label = locale === 'id' ? 'Kembali ke atas' : 'Back to top';

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      className={`fixed right-6 z-40 w-10 h-10 flex items-center justify-center rounded-xl bg-[#0D0F14]/90 hover:bg-[#161922] text-gray-400 hover:text-white border border-white/10 hover:border-brand/40 shadow-lg shadow-black/40 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand/40 group active:scale-95 ${
        isVisible
          ? 'bottom-[84px] sm:bottom-[88px] opacity-100 pointer-events-auto translate-y-0'
          : 'bottom-[84px] sm:bottom-[88px] opacity-0 pointer-events-none translate-y-3'
      }`}
    >
      <ArrowUp className="w-4 h-4 text-gray-300 group-hover:text-brand group-hover:-translate-y-0.5 transition-all" />
    </button>
  );
}
