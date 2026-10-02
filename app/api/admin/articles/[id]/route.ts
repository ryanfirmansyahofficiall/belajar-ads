import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const article = await prisma.article.findUnique({
    where: { id: params.id },
  });

  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const {
      titleId,
      titleEn,
      title, // legacy fallback
      slug,
      excerptId,
      excerptEn,
      excerpt, // legacy fallback
      contentId,
      contentEn,
      content, // legacy fallback
      category,
      tags,
      author,
      readingTime,
      isPublished,
      featuredImage,
      metaTitleId,
      metaTitleEn,
      metaTitle,
      metaDescId,
      metaDescEn,
      metaDesc,
      ogImage,
    } = body;

    const existing = await prisma.article.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Slug conflict check if slug modified
    if (slug && slug !== existing.slug) {
      const slugMatch = await prisma.article.findUnique({ where: { slug } });
      if (slugMatch) {
        return NextResponse.json({ error: 'Slug already taken.' }, { status: 400 });
      }
    }

    const updated = await prisma.article.update({
      where: { id: params.id },
      data: {
        titleId: titleId ?? (title !== undefined ? title : existing.titleId),
        titleEn: titleEn !== undefined ? titleEn : existing.titleEn,
        slug: slug ?? existing.slug,
        excerptId: excerptId ?? (excerpt !== undefined ? excerpt : existing.excerptId),
        excerptEn: excerptEn !== undefined ? excerptEn : existing.excerptEn,
        contentId: contentId ?? (content !== undefined ? content : existing.contentId),
        contentEn: contentEn !== undefined ? contentEn : existing.contentEn,
        category: category ?? existing.category,
        tags: tags !== undefined ? tags : existing.tags,
        author: author ?? existing.author,
        readingTime: readingTime ?? existing.readingTime,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : existing.isPublished,
        publishedAt:
          isPublished && !existing.isPublished
            ? new Date()
            : isPublished === false
            ? null
            : existing.publishedAt,
        featuredImage: featuredImage !== undefined ? featuredImage : existing.featuredImage,
        ogImage: ogImage !== undefined ? ogImage : existing.ogImage,
        metaTitleId: metaTitleId ?? (metaTitle !== undefined ? metaTitle : existing.metaTitleId),
        metaTitleEn: metaTitleEn !== undefined ? metaTitleEn : existing.metaTitleEn,
        metaDescId: metaDescId ?? (metaDesc !== undefined ? metaDesc : existing.metaDescId),
        metaDescEn: metaDescEn !== undefined ? metaDescEn : existing.metaDescEn,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.article.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: 'Article deleted successfully.' });
  } catch (error) {
    console.error('Failed to delete article:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
