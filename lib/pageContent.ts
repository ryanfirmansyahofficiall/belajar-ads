import { prisma } from './prisma';

export async function getPageSections(pageKey: string): Promise<Record<string, { id: Record<string, any>; en: Record<string, any> }>> {
  try {
    const keys = Array.from(new Set([
      pageKey,
      pageKey.toLowerCase().replace(/_/g, '-'),
      pageKey.toLowerCase().replace(/-/g, '_'),
      ...(pageKey.includes('home') ? ['home', 'homepage'] : []),
    ]));

    const sections = await prisma.pageContent.findMany({
      where: { pageKey: { in: keys } },
    });

    const result: Record<string, { id: Record<string, any>; en: Record<string, any> }> = {};

    for (const sec of sections) {
      let idData: Record<string, any> = {};
      let enData: Record<string, any> = {};

      try {
        idData = JSON.parse(sec.contentId);
      } catch {
        idData = { text: sec.contentId };
      }

      try {
        enData = JSON.parse(sec.contentEn);
      } catch {
        enData = { text: sec.contentEn };
      }

      result[sec.sectionKey] = {
        id: idData,
        en: enData,
      };
    }

    return result;
  } catch (error) {
    console.error(`Error fetching page sections for ${pageKey}:`, error);
    return {};
  }
}
