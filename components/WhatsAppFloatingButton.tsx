'use client';

import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { useLanguage } from '@/context/LanguageContext';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export function WhatsAppFloatingButton() {
  const settings = useSettings();
  const { locale } = useLanguage();

  const whatsappUrl = settings.whatsappUrl?.trim();

  // If WhatsApp URL is empty or not configured in CMS settings, do not render
  if (!whatsappUrl || !whatsappUrl.startsWith('http')) {
    return null;
  }

  const tooltipText = locale === 'id' ? 'Chat via WhatsApp' : 'Chat on WhatsApp';
  const ariaLabel = locale === 'id' ? 'Hubungi kami via WhatsApp' : 'Contact us on WhatsApp';

  return (
    <aside aria-label="WhatsApp Floating Action" className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        title={tooltipText}
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-black/50 hover:shadow-[#25D366]/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
        <span className="hidden sm:inline-block text-xs font-bold tracking-wide whitespace-nowrap">
          {tooltipText}
        </span>
      </a>
    </aside>
  );
}
