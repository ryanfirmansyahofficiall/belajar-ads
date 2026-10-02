'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ROUTES } from '@/lib/routes';
import { Badge } from '@/components/SectionHeading';
import { ArticleCard } from '@/components/ArticleCard';
import { Clock, Calendar, User, ChevronLeft } from 'lucide-react';
import { Article } from '@prisma/client';

interface ArticleDetailClientProps {
  article: Article;
  relatedArticles: Article[];
}

export function ArticleDetailClient({ article, relatedArticles }: ArticleDetailClientProps) {
  const { locale } = useLanguage();

  const title = locale === 'en' ? (article.titleEn || article.titleId) : article.titleId;
  const excerpt = locale === 'en' ? (article.excerptEn || article.excerptId) : article.excerptId;
  const content = locale === 'en' ? (article.contentEn || article.contentId) : article.contentId;

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <article className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href={ROUTES.ARTICLES}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{locale === 'id' ? 'Kembali ke Semua Artikel' : 'Back to All Articles'}</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <Badge variant="brand">{article.category}</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-[-0.03em] leading-[1.08]">
            {title}
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed">
            {excerpt}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-gray-400 border-y border-dark-border py-4">
            <span className="flex items-center gap-1.5 text-gray-200">
              <User className="w-4 h-4 text-brand" />
              <span>{article.author}</span>
            </span>

            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{formattedDate}</span>
              </span>
            )}

            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{article.readingTime}</span>
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-dark-muted border border-dark-border">
            <Image
              src={article.featuredImage}
              alt={title}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Content Body */}
        <div className="prose prose-invert prose-orange max-w-none space-y-6 text-gray-200 leading-relaxed text-base sm:text-lg">
          {content ? (
            content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-extrabold text-white pt-6 mb-3 tracking-[-0.02em]">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-bold text-white pt-4 mb-2 tracking-tight">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                return (
                  <div key={idx} className="pl-4 border-l-2 border-brand/50 my-4 text-gray-300">
                    {paragraph}
                  </div>
                );
              }
              return (
                <p key={idx} className="text-gray-300">
                  {paragraph}
                </p>
              );
            })
          ) : (
            <p className="text-gray-400 italic">
              {locale === 'id' ? 'Konten artikel belum tersedia.' : 'Article content is not yet available.'}
            </p>
          )}
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-dark-card to-dark-surface border border-dark-border text-center space-y-4 mt-16">
          <Badge variant="brand">{locale === 'id' ? 'Langkah Selanjutnya' : 'Next Steps'}</Badge>
          <h3 className="text-2xl font-bold text-white">
            {locale === 'id'
              ? 'Ingin Mempraktekkan Strategi Ini Secara Nyata?'
              : 'Ready to Put These Frameworks Into Action?'}
          </h3>
          <p className="text-sm text-gray-400 max-w-lg mx-auto">
            {locale === 'id'
              ? 'Ikuti program bootcamp dan workshop intensif Belajar Ads untuk pendampingan eksekusi langsung dari praktisi aktif.'
              : 'Join our training cohorts and workshops to execute campaigns under the guidance of seasoned practitioners.'}
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href={ROUTES.PROGRAMS}
              className="px-6 py-3 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold glow-orange-sm transition-all"
            >
              {locale === 'id' ? 'Lihat Program Belajar' : 'Explore Programs'}
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-dark-border">
            <h3 className="text-xl font-bold text-white">
              {locale === 'id' ? 'Artikel Terkait Lainnya' : 'Related Articles'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
