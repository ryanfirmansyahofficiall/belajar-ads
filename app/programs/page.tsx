import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PublicLayout } from '@/components/PublicLayout';
import { ProgramsPageClient } from '@/components/ProgramsPageClient';
import { isPageVisible } from '@/lib/visibility';

export const revalidate = 0;

export default async function ProgramsPage() {
  const visible = await isPageVisible('programs');
  if (!visible) {
    notFound();
  }

  const programs = await prisma.program.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PublicLayout>
      <ProgramsPageClient programs={programs} />
    </PublicLayout>
  );
}
