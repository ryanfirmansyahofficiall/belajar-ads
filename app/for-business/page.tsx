import React from 'react';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/PublicLayout';
import { ForBusinessClient } from './ForBusinessClient';
import { isPageVisible } from '@/lib/visibility';
import { getPageSections } from '@/lib/pageContent';

export const revalidate = 0;

export default async function ForBusinessPage() {
  const visible = await isPageVisible('for_business');
  if (!visible) {
    notFound();
  }

  const sections = await getPageSections('for_business');

  return (
    <PublicLayout>
      <ForBusinessClient sections={sections} />
    </PublicLayout>
  );
}
