'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ROUTES } from '@/lib/routes';
import { Badge } from '@/components/SectionHeading';
import { ArticleCard } from '@/components/ArticleCard';
import { BookOpen, Video, FileText, Sparkles, Download, ArrowRight } from 'lucide-react';
import { Article } from '@prisma/client';

interface ResourcesClientProps {
  articles: Article[];
  visibilities: Record<string, boolean>;
  sections: Record<string, { id: Record<string, any>; en: Record<string, any> }>;
}

export function ResourcesClient({ articles, visibilities, sections }: ResourcesClientProps) {
  const { locale } = useLanguage();

  const heroSec = sections['hero'];
  const localizedHero = heroSec ? (heroSec[locale] || heroSec.id || {}) : {};

  const allCategories = [
    {
      key: 'articles',
      title: locale === 'id' ? 'Artikel' : 'Articles',
      href: ROUTES.ARTICLES,
      desc:
        locale === 'id'
          ? 'Artikel edukasi fundamental, strategi, & optimasi Meta Ads.'
          : 'In-depth articles covering Meta Ads strategy and analytics.',
      icon: BookOpen,
      count: `${articles.length} ${locale === 'id' ? 'Artikel' : 'Articles'}`,
    },
    {
      key: 'tutorials',
      title: locale === 'id' ? 'Tutorial' : 'Tutorials',
      href: ROUTES.TUTORIALS,
      desc:
        locale === 'id'
          ? 'Panduan teknis langkah demi langkah (CAPI, Pixel, BM, Tracking).'
          : 'Step-by-step setup guides for Pixel, CAPI, and tracking architectures.',
      icon: Video,
      count: locale === 'id' ? 'Panduan' : 'Guides',
    },
    {
      key: 'case-studies',
      title: locale === 'id' ? 'Studi Kasus' : 'Case Studies',
      href: ROUTES.CASE_STUDIES,
      desc:
        locale === 'id'
          ? 'Pembahasan campaign nyata, metrik conversion, dan evaluasi hasil.'
          : 'Real-world campaign teardowns, ROAS analysis, and field results.',
      icon: FileText,
      count: locale === 'id' ? 'Data Nyata' : 'Real Data',
    },
    {
      key: 'ads-breakdown',
      title: locale === 'id' ? 'Bedah Iklan' : 'Ads Breakdown',
      href: ROUTES.ADS_BREAKDOWN,
      desc:
        locale === 'id'
          ? 'Analisis mendalam hook visual, copywriting, dan creative angle materi iklan.'
          : 'Teardowns of top-performing hooks, creative angles, and ad copy.',
      icon: Sparkles,
      count: locale === 'id' ? 'Kreatif' : 'Creative',
    },
    {
      key: 'free-resources',
      title: locale === 'id' ? 'Materi Gratis' : 'Free Resources',
      href: ROUTES.FREE_RESOURCES,
      desc:
        locale === 'id'
          ? 'Template spreadsheet, audit checklist, dan kalkulator ROAS gratis.'
          : 'Calculators, audit checklists, and free downloadable templates.',
      icon: Download,
      count: locale === 'id' ? 'Gratis' : 'Free',
    },
  ];

  // Filter categories by visibility
  const categories = allCategories.filter((cat) => visibilities[cat.key] !== false);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">
            {localizedHero.eyebrow || (locale === 'id' ? 'Pusat Pengetahuan' : 'Knowledge Hub')}
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {localizedHero.heading || (locale === 'id' ? 'Resources & Wawasan Advertising' : 'Resources & Insights')}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            {localizedHero.description || (
              locale === 'id'
                ? 'Pusat edukasi advertising komprehensif: pelajari strategi terbaru, ikuti tutorial teknis, bedah materi iklan konversi tinggi, dan unduh materi gratis untuk percepatan campaign Anda.'
                : 'Our comprehensive performance marketing repository: master foundational frameworks, access technical tutorials, inspect creative breakdowns, and download free tools.'
            )}
          </p>
        </div>

        {/* Category Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.key}
                href={cat.href}
                className="p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-gray-700 transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-gray-400 group-hover:text-brand transition-colors">
                    {cat.count}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-brand transition-colors mb-2 tracking-[-0.02em] leading-snug">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed flex-1 mb-4">
                  {cat.desc}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-brand">
                  <span>{locale === 'id' ? 'Buka Kategori' : 'Explore Category'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Latest Articles Section (only if articles category is visible) */}
        {visibilities['articles'] !== false && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-dark-border pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {locale === 'id' ? 'Artikel Terbaru' : 'Latest Articles'}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {locale === 'id'
                    ? 'Wawasan mendalam dan panduan praktis.'
                    : 'In-depth perspectives and actionable marketing guides.'}
                </p>
              </div>
              <Link
                href={ROUTES.ARTICLES}
                className="text-xs font-bold text-brand hover:text-brand-hover inline-flex items-center gap-1"
              >
                <span>{locale === 'id' ? 'Lihat Semua Artikel' : 'View All Articles'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.length > 0 ? (
                articles.map((art) => (
                  <ArticleCard key={art.id} article={art} />
                ))
              ) : (
                <div className="col-span-3 p-12 text-center rounded-2xl bg-dark-card border border-dark-border text-gray-400">
                  {locale === 'id' ? 'Belum ada artikel yang dipublikasikan.' : 'No articles published yet.'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
