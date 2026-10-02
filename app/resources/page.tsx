import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { isPageVisible, getAllPageVisibilities } from '@/lib/visibility';
import { getPageSections } from '@/lib/pageContent';
import { PublicLayout } from '@/components/PublicLayout';
import { ResourcesClient } from './ResourcesClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Resources & Insights | Belajar Ads',
  description: 'Pusat edukasi advertising komprehensif: pelajari strategi terbaru, ikuti tutorial teknis, bedah materi iklan konversi tinggi, dan unduh materi gratis.',
};

export default async function ResourcesPage() {
  const visible = await isPageVisible('resources');
  if (!visible) {
    notFound();
  }

  const [articles, visibilities, sections] = await Promise.all([
    prisma.article.findMany({
      where: { isPublished: true },
      take: 6,
      orderBy: { publishedAt: 'desc' },
    }),
    getAllPageVisibilities(),
    getPageSections('resources'),
  ]);

  return (
    <PublicLayout>
      <ResourcesClient
        articles={articles}
        visibilities={visibilities}
        sections={sections}
      />
    </PublicLayout>
  );
}
