import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PublicLayout } from '@/components/PublicLayout';
import { EventsPageClient } from './EventsPageClient';
import { isPageVisible } from '@/lib/visibility';

export const revalidate = 0;

export default async function EventsPage() {
  const visible = await isPageVisible('events');
  if (!visible) {
    notFound();
  }

  const [upcomingEvents, pastEvents] = await Promise.all([
    prisma.event.findMany({
      where: { status: { in: ['UPCOMING', 'OPEN'] } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.event.findMany({
      where: { status: { in: ['COMPLETED', 'CLOSED', 'SOLD_OUT'] } },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <PublicLayout>
      <EventsPageClient upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
    </PublicLayout>
  );
}
