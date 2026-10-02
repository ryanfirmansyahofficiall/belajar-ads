'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import { siteConfig } from '@/config/site';
import { Badge } from '@/components/SectionHeading';
import { ContactForm } from '@/components/ContactForm';
import { ExternalButton } from '@/components/ExternalButton';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { Mail, Clock } from 'lucide-react';

interface ContactClientProps {
  sections: Record<string, { id: Record<string, any>; en: Record<string, any> }>;
}

export function ContactClient({ sections }: ContactClientProps) {
  const { locale } = useLanguage();
  const settings = useSettings();
  const contactEmail = settings.contactEmail || siteConfig.links.email;
  const whatsappUrl = settings.whatsappUrl || siteConfig.links.whatsapp;

  const heroSec = sections['hero'];
  const localizedHero = heroSec ? (heroSec[locale] || heroSec.id || {}) : {};

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">
            {localizedHero.eyebrow || (locale === 'id' ? 'Hubungi Kami' : 'Get In Touch')}
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {localizedHero.heading || (locale === 'id' ? 'Hubungi Tim Belajar Ads' : 'Connect with Belajar Ads')}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            {localizedHero.description || (
              locale === 'id'
                ? 'Punya pertanyaan seputar program bootcamp, in-house workshop perusahaan, mentoring privat, atau kolaborasi komunitas? Kami siap berdiskusi.'
                : 'Have questions regarding our training cohorts, corporate workshops, private coaching, or community partnerships? Get in touch with our team.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {locale === 'id' ? 'Saluran Komunikasi Resmi' : 'Official Channels'}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                {locale === 'id'
                  ? 'Silakan hubungi kami melalui saluran berikut. Tim kami aktif merespons pada jam operasional kerja.'
                  : 'Reach out through any of our official channels below. Our team responds promptly during business hours.'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-dark-card border border-dark-border flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-400 font-semibold uppercase">Email</span>
                  {contactEmail ? (
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-sm font-bold text-white hover:text-brand transition-colors"
                    >
                      {contactEmail}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">contact@belajarads.com</span>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {locale === 'id'
                      ? 'Untuk proposal kemitraan & pertanyaan formal'
                      : 'For partnership proposals & formal inquiries'}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-dark-card border border-dark-border flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="block text-xs text-gray-400 font-semibold uppercase">WhatsApp Official</span>
                  <ExternalButton
                    href={whatsappUrl}
                    variant="outline"
                    className="text-xs mt-2 py-1.5 px-3"
                    fallbackText={
                      locale === 'id'
                        ? 'Nomor WhatsApp resmi akan segera diperbarui.'
                        : 'Official WhatsApp link will be configured shortly.'
                    }
                  >
                    {locale === 'id' ? 'Chat via WhatsApp' : 'Chat on WhatsApp'}
                  </ExternalButton>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-dark-card border border-dark-border flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-400 font-semibold uppercase">
                    {locale === 'id' ? 'Jam Operasional' : 'Working Hours'}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {locale === 'id' ? 'Senin - Jumat: 09:00 - 18:00 WIB' : 'Monday - Friday: 09:00 - 18:00 WIB'}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {locale === 'id'
                      ? 'Pesan di luar jam kerja akan direspons pada hari kerja berikutnya.'
                      : 'Inquiries sent outside business hours will be answered on the next business day.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
