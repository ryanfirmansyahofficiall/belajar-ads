import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

// Standard editable pages list
const EDITABLE_PAGES = [
  { key: 'homepage', name: 'Homepage', route: '/', description: 'Hero, Framework, Programs, Community, Events, CTA' },
  { key: 'programs', name: 'Programs', route: '/programs', description: 'Header, overview, cohort list, comparison' },
  { key: 'events', name: 'Events', route: '/events', description: 'Header, upcoming sessions, past webinars' },
  { key: 'community', name: 'Community', route: '/community', description: 'Header, ecosystem benefits, platform features' },
  { key: 'for-business', name: 'For Business', route: '/for-business', description: 'Header, in-house consulting, corporate training' },
  { key: 'resources', name: 'Resources', route: '/resources', description: 'Header, knowledge hub categories, latest guides' },
  { key: 'about', name: 'About Us', route: '/about', description: 'Story, mission, vision, philosophy, mentors' },
  { key: 'contact', name: 'Contact', route: '/contact', description: 'Header, office details, direct inquiry form' },
];

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [visibilities, contents] = await Promise.all([
      prisma.pageVisibility.findMany(),
      prisma.pageContent.findMany(),
    ]);

    const visMap: Record<string, boolean> = {};
    for (const v of visibilities) {
      visMap[v.pageKey] = v.isVisible;
      visMap[v.pageKey.replace(/_/g, '-')] = v.isVisible;
    }

    const sectionCounts: Record<string, number> = {};
    for (const c of contents) {
      const k = c.pageKey.replace(/_/g, '-');
      sectionCounts[k] = (sectionCounts[k] || 0) + 1;
    }

    const pages = EDITABLE_PAGES.map((p) => ({
      ...p,
      isVisible: visMap[p.key] !== false,
      sectionsCount: sectionCounts[p.key] || 0,
    }));

    // Also include resource categories for visibility control
    const resourceCategories = [
      { key: 'articles', name: 'Articles', route: '/resources/articles', isVisible: visMap['articles'] !== false },
      { key: 'tutorials', name: 'Tutorials', route: '/resources/tutorials', isVisible: visMap['tutorials'] !== false },
      { key: 'case-studies', name: 'Case Studies', route: '/resources/case-studies', isVisible: visMap['case-studies'] !== false },
      { key: 'ads-breakdown', name: 'Ads Breakdown', route: '/resources/ads-breakdown', isVisible: visMap['ads-breakdown'] !== false },
      { key: 'free-resources', name: 'Free Resources', route: '/resources/free-resources', isVisible: visMap['free-resources'] !== false },
    ];

    return NextResponse.json({ pages, resourceCategories });
  } catch (error) {
    console.error('Failed to get pages list:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}
