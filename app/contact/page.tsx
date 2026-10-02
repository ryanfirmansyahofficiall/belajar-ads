import React from 'react';
import { notFound } from 'next/navigation';
import { isPageVisible } from '@/lib/visibility';
import { getPageSections } from '@/lib/pageContent';
import { PublicLayout } from '@/components/PublicLayout';
import { ContactClient } from './ContactClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hubungi Kami | Belajar Ads',
  description: 'Hubungi tim Belajar Ads untuk pertanyaan seputar program pelatihan, konsultasi privat, in-house corporate workshop, atau kemitraan.',
};

export default async function ContactPage() {
  const visible = await isPageVisible('contact');
  if (!visible) {
    notFound();
  }

  const sections = await getPageSections('contact');

  return (
    <PublicLayout>
      <ContactClient sections={sections} />
    </PublicLayout>
  );
}
