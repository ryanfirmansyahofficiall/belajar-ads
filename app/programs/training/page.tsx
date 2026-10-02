import React from 'react';
import { prisma } from '@/lib/prisma';
import { PublicLayout } from '@/components/PublicLayout';
import { TrainingClient } from './TrainingClient';

export const revalidate = 0;

export default async function TrainingPage() {
  const trainingPrograms = await prisma.program.findMany({
    where: { category: 'TRAINING' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PublicLayout>
      <TrainingClient programs={trainingPrograms} />
    </PublicLayout>
  );
}
