import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(resources);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { 
      titleId, 
      titleEn, 
      title, 
      slug, 
      type, 
      category, 
      excerptId, 
      excerptEn, 
      excerpt, 
      contentId, 
      contentEn, 
      content, 
      downloadUrl, 
      featuredImage, 
      isPublished 
    } = body;

    const finalTitleId = titleId || title || '';
    const finalTitleEn = titleEn || finalTitleId;
    const finalExcerptId = excerptId || excerpt || '';
    const finalExcerptEn = excerptEn || finalExcerptId;
    const finalContentId = contentId || content || '';
    const finalContentEn = contentEn || finalContentId;

    if (!finalTitleId || !slug || !finalContentId) {
      return NextResponse.json({ error: 'Title, slug, and content are required.' }, { status: 400 });
    }

    const existing = await prisma.resource.findUnique({ where: { slug } });
    if (existing) return NextResponse.json({ error: 'Slug must be unique.' }, { status: 400 });

    const resource = await prisma.resource.create({
      data: {
        titleId: finalTitleId,
        titleEn: finalTitleEn,
        slug,
        type: type || 'TUTORIAL',
        category: category || 'Meta Ads',
        excerptId: finalExcerptId,
        excerptEn: finalExcerptEn,
        contentId: finalContentId,
        contentEn: finalContentEn,
        downloadUrl: downloadUrl || null,
        featuredImage: featuredImage || null,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error('Create resource error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
