import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

interface Params {
  params: {
    key: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const pageKey = params.key.toLowerCase().replace(/_/g, '-');

  try {
    const keysToFind = Array.from(new Set([
      pageKey,
      pageKey.replace(/-/g, '_'),
      pageKey.replace(/_/g, '-'),
      ...(pageKey.includes('home') ? ['home', 'homepage'] : []),
    ]));

    const rawSections = await prisma.pageContent.findMany({
      where: {
        pageKey: { in: keysToFind },
      },
    });

    const sections: Record<string, { id: Record<string, any>; en: Record<string, any> }> = {};

    for (const sec of rawSections) {
      try {
        sections[sec.sectionKey] = {
          id: JSON.parse(sec.contentId),
          en: JSON.parse(sec.contentEn),
        };
      } catch (err) {
        console.error(`Failed parsing JSON for section ${sec.sectionKey}:`, err);
      }
    }

    return NextResponse.json({ pageKey, sections });
  } catch (error) {
    console.error(`Failed to get page sections for ${pageKey}:`, error);
    return NextResponse.json({ error: 'Failed to fetch page sections' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const pageKey = params.key.toLowerCase().replace(/_/g, '-');

  try {
    const body = await request.json();
    const { sections } = body;

    if (!sections || typeof sections !== 'object') {
      return NextResponse.json({ error: 'Invalid sections payload' }, { status: 400 });
    }

    for (const [sectionKey, content] of Object.entries(sections as Record<string, { id: any; en: any }>)) {
      const contentIdStr = typeof content.id === 'string' ? content.id : JSON.stringify(content.id || {});
      const contentEnStr = typeof content.en === 'string' ? content.en : JSON.stringify(content.en || {});

      await prisma.pageContent.upsert({
        where: {
          pageKey_sectionKey: {
            pageKey,
            sectionKey,
          },
        },
        update: {
          contentId: contentIdStr,
          contentEn: contentEnStr,
        },
        create: {
          pageKey,
          sectionKey,
          contentId: contentIdStr,
          contentEn: contentEnStr,
        },
      });
    }

    return NextResponse.json({ success: true, message: 'Page content updated successfully' });
  } catch (error) {
    console.error(`Failed to update page sections for ${pageKey}:`, error);
    return NextResponse.json({ error: 'Internal server error while saving content' }, { status: 500 });
  }
}
