'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ROUTES } from '@/lib/routes';
import { Badge } from '@/components/SectionHeading';
import { ChevronLeft } from 'lucide-react';
import { Resource } from '@prisma/client';

interface TutorialsClientProps {
  tutorials: Resource[];
}

export function TutorialsClient({ tutorials }: TutorialsClientProps) {
  const { locale } = useLanguage();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <Link
            href={ROUTES.RESOURCES}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{locale === 'id' ? 'Kembali ke Resources' : 'Back to Resources'}</span>
          </Link>
        </div>

        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">
            {locale === 'id' ? 'Panduan Langkah Demi Langkah' : 'Step-by-Step Guides'}
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {locale === 'id' ? 'Tutorial & Pengaturan Teknis' : 'Tutorials & Technical Setup'}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            {locale === 'id'
              ? 'Panduan teknis langkah demi langkah untuk konfigurasi Business Manager, Meta Pixel, Conversions API, hingga audit conversion funnel.'
              : 'Step-by-step walkthroughs for tracking architectures, Business Manager configurations, and data diagnostics.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.length > 0 ? (
            tutorials.map((item) => {
              const title = locale === 'en' ? (item.titleEn || item.titleId) : item.titleId;
              const excerpt = locale === 'en' ? (item.excerptEn || item.excerptId) : item.excerptId;

              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-4 flex flex-col group hover:border-gray-700 transition-all"
                >
                  <Badge variant="brand">{item.category || 'Tutorial'}</Badge>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-brand transition-colors tracking-[-0.02em] leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-400 flex-1 leading-relaxed">
                    {excerpt}
                  </p>
                  <div className="pt-4 border-t border-dark-border text-xs text-gray-300 flex items-center justify-between">
                    <span>{locale === 'id' ? 'Panduan Teknis' : 'Technical Guide'}</span>
                    <span className="text-brand font-semibold">
                      {locale === 'id' ? 'Tersedia' : 'Available'}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 p-12 text-center rounded-2xl bg-dark-card border border-dark-border text-gray-400">
              {locale === 'id'
                ? 'Tutorial baru sedang dalam proses penulisan oleh tim praktisi kami.'
                : 'New tutorials are currently being prepared by our practitioner team.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
