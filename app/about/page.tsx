import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PublicLayout } from '@/components/PublicLayout';
import { AboutClient } from './AboutClient';
import { isPageVisible } from '@/lib/visibility';
import { getPageSections } from '@/lib/pageContent';

export const revalidate = 0;

export default async function AboutPage() {
  const visible = await isPageVisible('about');
  if (!visible) {
    notFound();
  }

  const [sections, mentors] = await Promise.all([
    getPageSections('about'),
    prisma.mentor.findMany({
      orderBy: { order: 'asc' },
    }),
  ]);

  return (
    <PublicLayout>
      <AboutClient sections={sections} mentors={mentors} />
    </PublicLayout>
  );
}
