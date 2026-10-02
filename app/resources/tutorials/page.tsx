import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { isPageVisible } from '@/lib/visibility';
import { PublicLayout } from '@/components/PublicLayout';
import { TutorialsClient } from './TutorialsClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tutorial & Pengaturan Teknis | Belajar Ads',
  description: 'Panduan teknis langkah demi langkah untuk konfigurasi Business Manager, Meta Pixel, Conversions API, hingga audit conversion funnel.',
};

export default async function TutorialsPage() {
  const visible = await isPageVisible('tutorials');
  if (!visible) {
    notFound();
  }

  const tutorials = await prisma.resource.findMany({
    where: { type: 'TUTORIAL', isPublished: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PublicLayout>
      <TutorialsClient tutorials={tutorials} />
    </PublicLayout>
  );
}
