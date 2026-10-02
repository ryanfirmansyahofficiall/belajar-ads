'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@prisma/client';
import { ROUTES } from '@/lib/routes';
import { useLanguage } from '@/context/LanguageContext';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { locale } = useLanguage();
  const title = locale === 'en' ? (article.titleEn || article.titleId) : article.titleId;
  const excerpt = locale === 'en' ? (article.excerptEn || article.excerptId) : article.excerptId;

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <article className="group relative flex flex-col bg-[#0D0F12] hover:bg-[#111418] border border-white/[0.08] hover:border-white/20 rounded-xl overflow-hidden transition-colors duration-200">
      {/* Featured Image */}
      <Link
        href={ROUTES.ARTICLE_DETAIL(article.slug)}
        className="block relative aspect-[16/10] w-full overflow-hidden bg-dark-muted"
      >
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-dark-surface text-gray-500 text-xs font-mono font-bold tracking-wider">
            BELAJAR ADS
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-transparent opacity-80" />
        
        {/* Category Pill Tag */}
        <div className="absolute top-3.5 left-3.5">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider uppercase bg-black/70 border border-white/15 text-white">
            {article.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-7 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-mono">
          {formattedDate && (
            <span className="flex items-center gap-1.5 text-gray-400">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{formattedDate}</span>
            </span>
          )}
          <span className="flex items-center gap-1.5 text-gray-400">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            <span>{article.readingTime}</span>
          </span>
        </div>

        <Link href={ROUTES.ARTICLE_DETAIL(article.slug)} className="block">
          {/* Primary Entity Title */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-brand transition-colors mb-3 line-clamp-2 leading-[1.2] tracking-[-0.02em]">
            {title}
          </h3>
        </Link>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1 font-normal">
          {excerpt}
        </p>

        <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-500 font-medium">
            {locale === 'id' ? 'Oleh' : 'By'} {article.author}
          </span>
          <Link
            href={ROUTES.ARTICLE_DETAIL(article.slug)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-hover transition-colors group/link"
          >
            <span>{locale === 'id' ? 'Baca Selengkapnya' : 'Read Article'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
