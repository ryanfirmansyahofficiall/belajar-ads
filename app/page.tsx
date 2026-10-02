import React from 'react';
import { prisma } from '@/lib/prisma';
import { PublicLayout } from '@/components/PublicLayout';
import { HomePageClient } from '@/components/HomePageClient';
import { getPageSections } from '@/lib/pageContent';
import { getAllPageVisibilities } from '@/lib/visibility';

export const revalidate = 0; // Dynamic data for instant CMS reflection

export default async function HomePage() {
  const [pageSections, programs, events, articles, visibilities] = await Promise.all([
    getPageSections('home'),
    prisma.program.findMany({
      where: { isFeatured: true },
      take: 3,
      orderBy: { createdAt: 'desc' },
    }).then(res => res.length ? res : prisma.program.findMany({ take: 3, orderBy: { createdAt: 'desc' } })),
    prisma.event.findMany({
      where: { status: 'UPCOMING' },
      take: 2,
      orderBy: { createdAt: 'desc' },
    }).then(res => res.length ? res : prisma.event.findMany({ take: 2, orderBy: { createdAt: 'desc' } })),
    prisma.article.findMany({
      where: { isPublished: true },
      take: 3,
      orderBy: { publishedAt: 'desc' },
    }),
    getAllPageVisibilities(),
  ]);

  return (
    <PublicLayout>
      <HomePageClient
        pageSections={pageSections}
        programs={programs}
        events={events}
        articles={articles}
        visibilities={visibilities}
      />
    </PublicLayout>
  );
}
