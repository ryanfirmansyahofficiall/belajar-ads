import { prisma } from './prisma';

export const PAGE_KEYS = [
  'homepage',
  'programs',
  'events',
  'community',
  'for-business',
  'resources',
  'about',
  'contact',
  'articles',
  'tutorials',
  'case-studies',
  'ads-breakdown',
  'free-resources',
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/_/g, '-');
}

const DEFAULT_VISIBILITIES: Record<string, boolean> = {
  homepage: true,
  programs: true,
  events: true,
  community: true,
  'for-business': true,
  for_business: true,
  resources: true,
  about: true,
  contact: true,
  articles: true,
  tutorials: true,
  'case-studies': true,
  case_studies: true,
  'ads-breakdown': true,
  ads_breakdown: true,
  'free-resources': true,
  free_resources: true,
};

export async function getAllPageVisibilities(): Promise<Record<string, boolean>> {
  try {
    const records = await prisma.pageVisibility.findMany();
    if (!records || records.length === 0) {
      return DEFAULT_VISIBILITIES;
    }
    const map: Record<string, boolean> = { ...DEFAULT_VISIBILITIES };
    for (const r of records) {
      const norm = normalizeKey(r.pageKey);
      const under = norm.replace(/-/g, '_');
      map[norm] = r.isVisible;
      map[under] = r.isVisible;
    }
    return map;
  } catch (error) {
    console.error('Error fetching page visibilities:', error);
    return DEFAULT_VISIBILITIES;
  }
}

export async function isPageVisible(pageKey: string): Promise<boolean> {
  try {
    const norm = normalizeKey(pageKey);
    const under = norm.replace(/-/g, '_');

    const record = await prisma.pageVisibility.findFirst({
      where: {
        OR: [
          { pageKey: norm },
          { pageKey: under },
        ],
      },
      select: { isVisible: true },
    });

    if (!record) return true; // Default to visible if not specified
    return record.isVisible;
  } catch (error) {
    console.error(`Error checking visibility for ${pageKey}:`, error);
    return true;
  }
}
