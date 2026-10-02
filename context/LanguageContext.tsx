'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale } from '@/lib/routes';
import { dictionary, getDictionary } from '@/lib/dictionary';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: typeof dictionary['id'];
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'id',
  setLocale: () => {},
  dict: dictionary.id,
  isHydrated: false,
});

const COOKIE_NAME = 'NEXT_LOCALE';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('id');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Read persisted locale from cookie or localStorage on client mount
    try {
      let savedLocale: Locale | null = null;
      const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
      if (match && (match[2] === 'id' || match[2] === 'en')) {
        savedLocale = match[2] as Locale;
      } else {
        const local = localStorage.getItem(COOKIE_NAME);
        if (local === 'id' || local === 'en') {
          savedLocale = local as Locale;
        }
      }

      if (savedLocale && savedLocale !== locale) {
        setLocaleState(savedLocale);
      }
    } catch {
      // Fallback to default 'id'
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    if (newLocale !== 'id' && newLocale !== 'en') return;
    setLocaleState(newLocale);

    try {
      // Persist in cookie (1 year expiry) and localStorage
      const maxAge = 60 * 60 * 24 * 365;
      document.cookie = `${COOKIE_NAME}=${newLocale}; path=/; max-age=${maxAge}; SameSite=Lax`;
      localStorage.setItem(COOKIE_NAME, newLocale);
      
      // Update HTML lang attribute dynamically without page reload
      document.documentElement.lang = newLocale;
    } catch {
      // Safe fallback
    }
  };

  const dict = getDictionary(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dict, isHydrated }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
