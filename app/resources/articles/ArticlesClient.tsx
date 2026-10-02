'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ROUTES } from '@/lib/routes';
import { Badge } from '@/components/SectionHeading';
import { ArticleCard } from '@/components/ArticleCard';
import { ChevronLeft } from 'lucide-react';
import { Article } from '@prisma/client';

interface ArticlesClientProps {
  articles: Article[];
}

export function ArticlesClient({ articles }: ArticlesClientProps) {
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
            {locale === 'id' ? 'Editorial & Strategi' : 'Editorial & Strategy'}
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {locale === 'id' ? 'Artikel & Wawasan Advertising' : 'Advertising Articles & Strategy'}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            {locale === 'id'
              ? 'Artikel edukasi periklanan berbasis data, studi kasus praktis, dan framework teruji yang ditulis oleh praktisi media buying.'
              : 'Data-driven advertising articles, practical field notes, and tested frameworks authored by experienced practitioners.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length > 0 ? (
            articles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))
          ) : (
            <div className="col-span-3 p-16 text-center rounded-3xl bg-dark-card border border-dark-border text-gray-400">
              {locale === 'id' ? 'Belum ada artikel yang dipublikasikan.' : 'No articles published yet.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
