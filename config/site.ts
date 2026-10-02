import { ROUTES, Locale } from '@/lib/routes';

export interface SubNavItem {
  label: string;
  href: string;
  desc?: string;
  pageKey?: string;
}

export interface NavItem {
  label: string;
  href: string;
  pageKey?: string;
  subItems?: SubNavItem[];
}

export const siteConfig = {
  name: 'Belajar Ads',
  domain: 'belajarads.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://belajarads.com',
  ogImage: '/images/og-belajarads.jpg',
  heroHeadline: 'Learn Ads. Launch Campaigns. Grow.',
  usp: 'Learn. Launch. Optimize.',
  philosophy: 'Advertising is learned by doing.',
  
  // External URLs centralized from environment variables
  links: {
    community: process.env.COMMUNITY_URL || '',
    whatsapp: process.env.WHATSAPP_URL || '',
    instagram: process.env.INSTAGRAM_URL || '',
    facebook: process.env.FACEBOOK_URL || '',
    youtube: process.env.YOUTUBE_URL || '',
    lms: process.env.LMS_URL || '',
    payment: process.env.PAYMENT_URL || '',
    email: process.env.EMAIL_CONTACT || 'contact@belajarads.com',
  },

  // Navigation Items (Filtered by visibility)
  getNavItems: (locale: Locale = 'id', visibilities?: Record<string, boolean>): NavItem[] => {
    const isVis = (key: string) => visibilities ? visibilities[key] !== false : true;

    const items: NavItem[] = [];

    // Programs
    if (isVis('programs')) {
      items.push({
        label: locale === 'id' ? 'Program' : 'Programs',
        href: ROUTES.PROGRAMS,
        pageKey: 'programs',
        subItems: [
          { label: locale === 'id' ? 'Semua Program' : 'All Programs', href: ROUTES.PROGRAMS, desc: locale === 'id' ? 'Katalog lengkap program belajar' : 'Explore all learning pathways' },
          { label: 'Meta Ads', href: ROUTES.PROGRAMS_META_ADS, desc: locale === 'id' ? 'Kuasai Meta Ads dari dasar' : 'Master Meta Ads end-to-end' },
          { label: 'E-Course', href: ROUTES.PROGRAMS_ECOURSE, desc: locale === 'id' ? 'Belajar mandiri video on-demand' : 'Self-paced video learning' },
          { label: 'Live Training', href: ROUTES.PROGRAMS_TRAINING, desc: locale === 'id' ? 'Kelas online intensif interaktif' : 'Interactive cohort classes' },
          { label: 'Workshop', href: ROUTES.PROGRAMS_WORKSHOP, desc: locale === 'id' ? 'Praktek langsung hands-on' : 'Hands-on practical sessions' },
          { label: 'Private Mentoring', href: ROUTES.PROGRAMS_PRIVATE_MENTORING, desc: locale === 'id' ? 'Bimbingan 1-on-1 personal' : 'Personal 1-on-1 guidance' },
        ],
      });
    }

    // Events
    if (isVis('events')) {
      items.push({
        label: locale === 'id' ? 'Event' : 'Events',
        href: ROUTES.EVENTS,
        pageKey: 'events',
      });
    }

    // Community
    if (isVis('community')) {
      items.push({
        label: locale === 'id' ? 'Komunitas' : 'Community',
        href: ROUTES.COMMUNITY,
        pageKey: 'community',
      });
    }

    // For Business
    if (isVis('for_business')) {
      items.push({
        label: locale === 'id' ? 'Solusi Bisnis' : 'For Business',
        href: ROUTES.FOR_BUSINESS,
        pageKey: 'for_business',
      });
    }

    // Resources
    if (isVis('resources')) {
      const resourceSubs: SubNavItem[] = [
        { label: locale === 'id' ? 'Semua Resources' : 'All Resources', href: ROUTES.RESOURCES },
      ];

      if (isVis('articles')) {
        resourceSubs.push({ label: locale === 'id' ? 'Artikel' : 'Articles', href: ROUTES.ARTICLES, desc: locale === 'id' ? 'Wawasan mendalam dan analisis' : 'Deep dives and analysis' });
      }
      if (isVis('tutorials')) {
        resourceSubs.push({ label: locale === 'id' ? 'Tutorial' : 'Tutorials', href: ROUTES.TUTORIALS, desc: locale === 'id' ? 'Panduan teknis langkah demi langkah' : 'Step-by-step technical guides' });
      }
      if (isVis('case_studies')) {
        resourceSubs.push({ label: locale === 'id' ? 'Studi Kasus' : 'Case Studies', href: ROUTES.CASE_STUDIES, desc: locale === 'id' ? 'Data riil kampanye terbukti' : 'Real verified campaign data' });
      }
      if (isVis('ads_breakdown')) {
        resourceSubs.push({ label: locale === 'id' ? 'Bedah Iklan' : 'Ads Breakdown', href: ROUTES.ADS_BREAKDOWN, desc: locale === 'id' ? 'Analisis materi iklan berkinerja tinggi' : 'High-converting ad teardowns' });
      }
      if (isVis('free_resources')) {
        resourceSubs.push({ label: locale === 'id' ? 'Materi Gratis' : 'Free Resources', href: ROUTES.FREE_RESOURCES, desc: locale === 'id' ? 'Template, checklist, dan lembar kerja' : 'Templates, checklists, & toolkits' });
      }

      items.push({
        label: locale === 'id' ? 'Sumber Daya' : 'Resources',
        href: ROUTES.RESOURCES,
        pageKey: 'resources',
        subItems: resourceSubs,
      });
    }

    // About
    if (isVis('about')) {
      items.push({
        label: locale === 'id' ? 'Tentang Kami' : 'About',
        href: ROUTES.ABOUT,
        pageKey: 'about',
      });
    }

    return items;
  },

  // Footer Navigation
  getFooterItems: (locale: Locale = 'id', visibilities?: Record<string, boolean>) => {
    const isVis = (key: string) => visibilities ? visibilities[key] !== false : true;

    const programs = isVis('programs') ? [
      { label: 'Meta Ads', href: ROUTES.PROGRAMS_META_ADS },
      { label: 'E-Course', href: ROUTES.PROGRAMS_ECOURSE },
      { label: 'Live Training', href: ROUTES.PROGRAMS_TRAINING },
      { label: 'Workshop', href: ROUTES.PROGRAMS_WORKSHOP },
      { label: 'Private Mentoring', href: ROUTES.PROGRAMS_PRIVATE_MENTORING },
    ] : [];

    const resources: { label: string; href: string }[] = [];
    if (isVis('resources')) {
      if (isVis('articles')) resources.push({ label: locale === 'id' ? 'Artikel Edukasi' : 'Articles', href: ROUTES.ARTICLES });
      if (isVis('tutorials')) resources.push({ label: locale === 'id' ? 'Tutorial Teknis' : 'Tutorials', href: ROUTES.TUTORIALS });
      if (isVis('case_studies')) resources.push({ label: locale === 'id' ? 'Studi Kasus' : 'Case Studies', href: ROUTES.CASE_STUDIES });
      if (isVis('ads_breakdown')) resources.push({ label: locale === 'id' ? 'Bedah Iklan' : 'Ads Breakdown', href: ROUTES.ADS_BREAKDOWN });
      if (isVis('free_resources')) resources.push({ label: locale === 'id' ? 'Materi Gratis' : 'Free Resources', href: ROUTES.FREE_RESOURCES });
    }

    const company: { label: string; href: string }[] = [];
    if (isVis('about')) company.push({ label: locale === 'id' ? 'Tentang Kami' : 'About Us', href: ROUTES.ABOUT });
    if (isVis('for_business')) company.push({ label: locale === 'id' ? 'Solusi Korporasi' : 'For Business', href: ROUTES.FOR_BUSINESS });
    if (isVis('events')) company.push({ label: locale === 'id' ? 'Jadwal Event' : 'Events', href: ROUTES.EVENTS });
    if (isVis('community')) company.push({ label: locale === 'id' ? 'Komunitas Praktisi' : 'Community', href: ROUTES.COMMUNITY });
    if (isVis('contact')) company.push({ label: locale === 'id' ? 'Hubungi Kami' : 'Contact', href: ROUTES.CONTACT });

    return { programs, resources, company };
  },
};
