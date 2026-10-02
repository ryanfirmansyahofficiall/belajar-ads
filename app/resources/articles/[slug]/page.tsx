import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { isPageVisible } from '@/lib/visibility';
import { PublicLayout } from '@/components/PublicLayout';
import { ArticleDetailClient } from './ArticleDetailClient';
import type { Metadata } from 'next';

interface ArticleDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.metaTitleId || `${article.titleId} | Belajar Ads`,
    description: article.metaDescId || article.excerptId,
    openGraph: {
      title: article.metaTitleId || article.titleId,
      description: article.metaDescId || article.excerptId,
      images: article.featuredImage ? [article.featuredImage] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const visible = await isPageVisible('articles');
  if (!visible) {
    notFound();
  }

  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article || (!article.isPublished && process.env.NODE_ENV === 'production')) {
    notFound();
  }

  const relatedArticles = await prisma.article.findMany({
    where: {
      slug: { not: article.slug },
      isPublished: true,
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <PublicLayout>
      <ArticleDetailClient article={article} relatedArticles={relatedArticles} />
    </PublicLayout>
  );
}
