import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { isPageVisible } from '@/lib/visibility';
import { PublicLayout } from '@/components/PublicLayout';
import { AdsBreakdownClient } from './AdsBreakdownClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Bedah Iklan Berkonversi Tinggi | Belajar Ads',
  description: 'Dekomposisi materi iklan dengan performa luar biasa: analisa hook 3 detik pertama, visual hierarchy, psikologi penawaran, hingga Call-to-Action.',
};

export default async function AdsBreakdownPage() {
  const visible = await isPageVisible('ads-breakdown');
  if (!visible) {
    notFound();
  }

  const breakdowns = await prisma.resource.findMany({
    where: { type: 'ADS_BREAKDOWN', isPublished: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PublicLayout>
      <AdsBreakdownClient breakdowns={breakdowns} />
    </PublicLayout>
  );
}
