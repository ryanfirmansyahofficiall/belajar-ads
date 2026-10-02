import React from 'react';
import { prisma } from '@/lib/prisma';
import { PublicLayout } from '@/components/PublicLayout';
import { ProgramCard } from '@/components/ProgramCard';
import { ECourseClient } from './ECourseClient';

export const revalidate = 0;

export default async function ECoursePage() {
  const ecourses = await prisma.program.findMany({
    where: { category: 'ECOURSE' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PublicLayout>
      <ECourseClient ecourses={ecourses} />
    </PublicLayout>
  );
}
