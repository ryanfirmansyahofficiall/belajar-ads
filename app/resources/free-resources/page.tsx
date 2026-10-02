import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { isPageVisible } from '@/lib/visibility';
import { PublicLayout } from '@/components/PublicLayout';
import { FreeResourcesClient } from './FreeResourcesClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Materi & Template Periklanan Gratis | Belajar Ads',
  description: 'Koleksi lembar kerja praktis, kalkulator ROAS & BEP, checklist persiapan campaign, dan panduan teknis yang siap Anda gunakan langsung.',
};

export default async function FreeResourcesPage() {
  const visible = await isPageVisible('free-resources');
  if (!visible) {
    notFound();
  }

  const resources = await prisma.resource.findMany({
    where: {
      type: { in: ['TEMPLATE', 'SPREADSHEET', 'GUIDE', 'CHECKLIST'] },
      isPublished: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PublicLayout>
      <FreeResourcesClient resources={resources} />
    </PublicLayout>
  );
}
