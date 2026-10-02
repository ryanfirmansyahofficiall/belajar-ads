import React from 'react';
import { prisma } from '@/lib/prisma';
import { PublicLayout } from '@/components/PublicLayout';
import { WorkshopClient } from './WorkshopClient';

export const revalidate = 0;

export default async function WorkshopPage() {
  const workshops = await prisma.program.findMany({
    where: { category: 'WORKSHOP' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PublicLayout>
      <WorkshopClient workshops={workshops} />
    </PublicLayout>
  );
}
