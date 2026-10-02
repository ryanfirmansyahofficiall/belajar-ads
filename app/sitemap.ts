import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { getAllPageVisibilities } from '@/lib/visibility';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://belajarads.com';

  const visibilities = await getAllPageVisibilities();

  const candidateRoutes: { path: string; key?: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '', key: 'homepage', priority: 1.0, changeFrequency: 'daily' },
    { path: '/programs', key: 'programs', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/programs/meta-ads', key: 'programs', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/programs/e-course', key: 'programs', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/programs/training', key: 'programs', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/programs/workshop', key: 'programs', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/programs/private-mentoring', key: 'programs', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/events', key: 'events', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/community', key: 'community', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/for-business', key: 'for-business', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/resources', key: 'resources', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/resources/articles', key: 'articles', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/resources/tutorials', key: 'tutorials', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/resources/case-studies', key: 'case-studies', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/resources/ads-breakdown', key: 'ads-breakdown', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/resources/free-resources', key: 'free-resources', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/about', key: 'about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', key: 'contact', priority: 0.7, changeFrequency: 'monthly' },
  ];

  const routes: MetadataRoute.Sitemap = [];

  for (const item of candidateRoutes) {
    if (item.key && visibilities[item.key] === false) {
      continue; // Skip hidden pages
    }
    routes.push({
      url: `${baseUrl}${item.path}`,
      lastModified: new Date(),
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    });
  }

  // Add published articles dynamically (if articles category is visible)
  if (visibilities['articles'] !== false) {
    try {
      const articles = await prisma.article.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      });

      for (const article of articles) {
        routes.push({
          url: `${baseUrl}/resources/articles/${article.slug}`,
          lastModified: article.updatedAt,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    } catch (e) {
      console.error('Error generating dynamic articles sitemap:', e);
    }
  }

  // Add events dynamically (if events page is visible)
  if (visibilities['events'] !== false) {
    try {
      const events = await prisma.event.findMany({
        select: { slug: true, updatedAt: true },
      });

      for (const event of events) {
        routes.push({
          url: `${baseUrl}/events/${event.slug}`,
          lastModified: event.updatedAt,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    } catch (e) {
      console.error('Error generating dynamic events sitemap:', e);
    }
  }

  return routes;
}
