import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { getSiteSettings } from '@/lib/settings';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';
import { BackToTop } from '@/components/BackToTop';

export const metadata: Metadata = {
  title: {
    default: 'Belajar Ads — Learn Ads. Launch Campaigns. Grow.',
    template: '%s | Belajar Ads',
  },
  description:
    'Belajar Ads adalah platform belajar advertising yang membantu individu dan bisnis membangun kemampuan menjalankan iklan secara praktis melalui course, training, workshop, mentoring, dan community.',
  keywords: [
    'Meta Ads',
    'Belajar Meta Ads',
    'Kursus Meta Ads',
    'Training Meta Ads',
    'Workshop Meta Ads',
    'Meta Ads untuk pemula',
    'Belajar Facebook Ads',
    'Facebook Ads Training',
    'Performance Marketing',
  ],
  authors: [{ name: 'Belajar Ads' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://belajarads.com'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://belajarads.com',
    siteName: 'Belajar Ads',
    title: 'Belajar Ads — Learn Ads. Launch Campaigns. Grow.',
    description: 'Advertising is learned by doing. Kursus, training, workshop, dan mentoring Meta Ads praktis untuk individu dan bisnis.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belajar Ads — Learn Ads. Launch Campaigns. Grow.',
    description: 'Advertising is learned by doing. Kursus, training, workshop, dan mentoring Meta Ads praktis.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="id" className="dark">
      <body className="bg-dark-bg text-gray-100 min-h-screen antialiased flex flex-col">
        <SettingsProvider initialSettings={settings}>
          <LanguageProvider>
            {children}
            <BackToTop />
            <WhatsAppFloatingButton />
          </LanguageProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
