import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Failed to get articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
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

    const finalTitleId = titleId || title || '';
    const finalTitleEn = titleEn || finalTitleId;
    const finalExcerptId = excerptId || excerpt || '';
    const finalExcerptEn = excerptEn || finalExcerptId;
    const finalContentId = contentId || content || '';
    const finalContentEn = contentEn || finalContentId;

    if (!finalTitleId || !slug || !finalContentId) {
      return NextResponse.json(
        { error: 'Title (ID), slug, and content (ID) are required.' },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: 'Slug must be unique. An article with this slug already exists.' },
        { status: 400 }
      );
    }

    const article = await prisma.article.create({
      data: {
        titleId: finalTitleId,
        titleEn: finalTitleEn,
        slug,
        excerptId: finalExcerptId,
        excerptEn: finalExcerptEn,
        contentId: finalContentId,
        contentEn: finalContentEn,
        category: category || 'Meta Ads',
        tags: tags || null,
        author: author || session.name,
        readingTime: readingTime || '5 min read',
        isPublished: Boolean(isPublished),
        publishedAt: isPublished ? new Date() : null,
        featuredImage: featuredImage || null,
        ogImage: ogImage || null,
        metaTitleId: metaTitleId || metaTitle || finalTitleId,
        metaTitleEn: metaTitleEn || finalTitleEn,
        metaDescId: metaDescId || metaDesc || finalExcerptId,
        metaDescEn: metaDescEn || finalExcerptEn,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Failed to create article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
