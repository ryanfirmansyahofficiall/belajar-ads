import React from 'react';
import { prisma } from '@/lib/prisma';
import { PublicLayout } from '@/components/PublicLayout';
import { PrivateMentoringClient } from './PrivateMentoringClient';

export const revalidate = 0;

export default async function PrivateMentoringPage() {
  const mentoringPrograms = await prisma.program.findMany({
    where: { category: 'PRIVATE_MENTORING' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PublicLayout>
      <PrivateMentoringClient programs={mentoringPrograms} />
    </PublicLayout>
  );
}
