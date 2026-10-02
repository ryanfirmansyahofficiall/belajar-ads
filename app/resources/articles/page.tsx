import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { isPageVisible } from '@/lib/visibility';
import { PublicLayout } from '@/components/PublicLayout';
import { ArticlesClient } from './ArticlesClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Artikel & Wawasan Advertising | Belajar Ads',
  description: 'Artikel edukasi periklanan berbasis data, studi kasus praktis, dan framework teruji yang ditulis oleh praktisi media buying.',
};

export default async function ArticlesPage() {
  const visible = await isPageVisible('articles');
  if (!visible) {
    notFound();
  }

  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <PublicLayout>
      <ArticlesClient articles={articles} />
    </PublicLayout>
  );
}
