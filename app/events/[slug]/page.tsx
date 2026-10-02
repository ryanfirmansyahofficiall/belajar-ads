import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PublicLayout } from '@/components/PublicLayout';
import { EventDetailClient } from './EventDetailClient';
import { isPageVisible } from '@/lib/visibility';
import type { Metadata } from 'next';

export const revalidate = 0;

interface EventDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug },
  });

  if (!event) return { title: 'Event Not Found' };

  return {
    title: event.metaTitleId || `${event.titleId} | Belajar Ads`,
    description: event.metaDescId || event.descriptionId,
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const visible = await isPageVisible('events');
  if (!visible) {
    notFound();
  }

  const event = await prisma.event.findUnique({
    where: { slug: params.slug },
  });

  if (!event) {
    notFound();
  }

  return (
    <PublicLayout>
      <EventDetailClient event={event} />
    </PublicLayout>
  );
}
