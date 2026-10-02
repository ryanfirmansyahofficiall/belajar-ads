'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/lib/routes';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import { Globe, Instagram, Facebook, Youtube } from 'lucide-react';

interface FooterProps {
  visibilities?: Record<string, boolean>;
}

export function Footer({ visibilities }: FooterProps) {
  const { locale, setLocale } = useLanguage();
  const settings = useSettings();
  const footerItems = siteConfig.getFooterItems(locale, visibilities);

  const hasInstagram = Boolean(settings.instagramUrl && settings.instagramUrl.trim().length > 0);
  const hasFacebook = Boolean(settings.facebookUrl && settings.facebookUrl.trim().length > 0);
  const hasYoutube = Boolean(settings.youtubeUrl && settings.youtubeUrl.trim().length > 0);
  const hasAnySocial = hasInstagram || hasFacebook || hasYoutube;

  return (
    <footer className="w-full bg-[#060708] border-t border-dark-border mt-auto pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-dark-border">
          {/* Brand Info & Social Media Links */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={ROUTES.HOME} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center font-black text-white text-base tracking-tighter shadow-md shadow-brand/30">
                BA
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Belajar<span className="text-brand">Ads</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              {locale === 'id'
                ? 'Platform belajar advertising yang membantu individu dan bisnis membangun kemampuan menjalankan iklan secara praktis melalui course, training, workshop, mentoring, dan community.'
                : 'Performance marketing education platform empowering businesses and media buyers through hands-on courses, intensive cohorts, workshops, mentoring, and community.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-brand tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <span>Advertising is learned by doing.</span>
            </div>

            {settings.contactEmail && (
              <div className="pt-1 text-xs text-gray-400">
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:text-brand transition-colors font-mono"
                  aria-label="Email Belajar Ads"
                >
                  {settings.contactEmail}
                </a>
              </div>
            )}

            {/* Social Media Channels connected to CMS Settings */}
            {hasAnySocial && (
              <div className="pt-3">
                <span className="block text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-2">
                  {locale === 'id' ? 'Media Sosial Resmi' : 'Official Channels'}
                </span>
                <div className="flex items-center gap-2.5">
                  {hasInstagram && (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Belajar Ads"
                      className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-brand/10 border border-white/10 hover:border-brand/40 text-gray-400 hover:text-brand flex items-center justify-center transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {hasFacebook && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook Belajar Ads"
                      className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-brand/10 border border-white/10 hover:border-brand/40 text-gray-400 hover:text-brand flex items-center justify-center transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {hasYoutube && (
                    <a
                      href={settings.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube Belajar Ads"
                      className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-brand/10 border border-white/10 hover:border-brand/40 text-gray-400 hover:text-brand flex items-center justify-center transition-colors"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Programs */}
          {footerItems.programs.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                {locale === 'id' ? 'Program' : 'Programs'}
              </h3>
              <ul className="space-y-2.5">
                {footerItems.programs.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources */}
          {footerItems.resources.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                {locale === 'id' ? 'Sumber Daya' : 'Resources'}
              </h3>
              <ul className="space-y-2.5">
                {footerItems.resources.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Company & Connect */}
          {footerItems.company.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                {locale === 'id' ? 'Perusahaan' : 'Company'}
              </h3>
              <ul className="space-y-2.5">
                {footerItems.company.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom bar with Language Switcher and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} Belajar Ads (belajarads.com). All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            {/* Language Switcher in Footer without reload */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Globe className="w-3.5 h-3.5 text-brand" />
              <span>{locale === 'id' ? 'Bahasa:' : 'Language:'}</span>
              <button
                type="button"
                onClick={() => setLocale('id')}
                className={`font-semibold transition-colors cursor-pointer ${
                  locale === 'id' ? 'text-brand underline' : 'text-gray-400 hover:text-white'
                }`}
              >
                Indonesia
              </button>
              <span className="text-gray-600">|</span>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`font-semibold transition-colors cursor-pointer ${
                  locale === 'en' ? 'text-brand underline' : 'text-gray-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
