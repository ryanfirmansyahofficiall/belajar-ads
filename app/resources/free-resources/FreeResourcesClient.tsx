'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ROUTES } from '@/lib/routes';
import { Badge } from '@/components/SectionHeading';
import { ChevronLeft, Download } from 'lucide-react';
import { Resource } from '@prisma/client';

interface FreeResourcesClientProps {
  resources: Resource[];
}

export function FreeResourcesClient({ resources }: FreeResourcesClientProps) {
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
            {locale === 'id' ? 'Toolkit & Template Gratis' : 'Free Toolkits & Templates'}
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {locale === 'id' ? 'Materi & Template Periklanan Gratis' : 'Free Advertising Resources & Templates'}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            {locale === 'id'
              ? 'Koleksi lembar kerja praktis, kalkulator ROAS & BEP, checklist persiapan campaign, dan panduan teknis yang siap Anda gunakan langsung.'
              : 'Our curated collection of campaign spreadsheets, ROAS & BEP calculators, launch checklists, and practical templates ready to deploy.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.length > 0 ? (
            resources.map((item) => {
              const title = locale === 'en' ? (item.titleEn || item.titleId) : item.titleId;
              const excerpt = locale === 'en' ? (item.excerptEn || item.excerptId) : item.excerptId;

              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-4 flex flex-col group hover:border-gray-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="brand">{item.category || item.type}</Badge>
                    <span className="text-xs text-brand font-semibold">
                      {locale === 'id' ? 'Gratis' : 'Free Access'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-brand transition-colors tracking-[-0.02em] leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-400 flex-1 leading-relaxed">
                    {excerpt}
                  </p>
                  <div className="pt-4 border-t border-dark-border flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {item.downloadUrl ? 'PDF / Spreadsheet' : (locale === 'id' ? 'Akses Terbuka' : 'Open Access')}
                    </span>
                    {item.downloadUrl ? (
                      <a
                        href={item.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand/10 hover:bg-brand text-brand hover:text-white text-xs font-bold transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{locale === 'id' ? 'Unduh' : 'Download'}</span>
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-brand">
                        {locale === 'id' ? 'Tersedia' : 'Available'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 p-12 text-center rounded-2xl bg-dark-card border border-dark-border text-gray-400">
              {locale === 'id'
                ? 'Materi gratis baru sedang disiapkan untuk Anda.'
                : 'New free resources and templates are currently being prepared.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
