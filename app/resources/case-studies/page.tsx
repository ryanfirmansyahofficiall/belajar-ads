import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { isPageVisible } from '@/lib/visibility';
import { PublicLayout } from '@/components/PublicLayout';
import { CaseStudiesClient } from './CaseStudiesClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Studi Kasus & Analisis Campaign | Belajar Ads',
  description: 'Bedah studi kasus nyata dari berbagai industri: bagaimana kami meriset audiens, menguji materi iklan, dan mencapai profitabilitas.',
};

export default async function CaseStudiesPage() {
  const visible = await isPageVisible('case-studies');
  if (!visible) {
    notFound();
  }

  const caseStudies = await prisma.resource.findMany({
    where: { type: 'CASE_STUDY', isPublished: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PublicLayout>
      <CaseStudiesClient caseStudies={caseStudies} />
    </PublicLayout>
  );
}
