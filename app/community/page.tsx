import React from 'react';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/PublicLayout';
import { CommunityClient } from './CommunityClient';
import { isPageVisible } from '@/lib/visibility';
import { getPageSections } from '@/lib/pageContent';

export const revalidate = 0;

export default async function CommunityPage() {
  const visible = await isPageVisible('community');
  if (!visible) {
    notFound();
  }

  const sections = await getPageSections('community');

  return (
    <PublicLayout>
      <CommunityClient sections={sections} />
    </PublicLayout>
  );
}
