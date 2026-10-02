import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const programs = await prisma.program.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(programs);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const {
      nameId,
      nameEn,
      name, // legacy fallback
      slug,
      category,
      topic,
      descriptionId,
      descriptionEn,
      description, // legacy fallback
      overviewId,
      overviewEn,
      level,
      format,
      isOnline,
      duration,
      price,
      instructor,
      startDate,
      registrationStatus,
      featuredImage,
      ctaTextId,
      ctaTextEn,
      registrationUrl,
      isFeatured,
      metaTitleId,
      metaTitleEn,
      metaDescId,
      metaDescEn,
    } = body;

    const finalNameId = nameId || name || '';
    const finalNameEn = nameEn || finalNameId;
    const finalDescId = descriptionId || description || '';
    const finalDescEn = descriptionEn || finalDescId;

    if (!finalNameId || !slug || !finalDescId) {
      return NextResponse.json(
        { error: 'Name (ID), slug, and description (ID) are required.' },
        { status: 400 }
      );
    }

    const existing = await prisma.program.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Slug must be unique.' }, { status: 400 });
    }

    const program = await prisma.program.create({
      data: {
        nameId: finalNameId,
        nameEn: finalNameEn,
        slug,
        category: category || 'TRAINING',
        topic: topic || 'Meta Ads',
        descriptionId: finalDescId,
        descriptionEn: finalDescEn,
        overviewId: overviewId || null,
        overviewEn: overviewEn || null,
        level: level || 'All Levels',
        format: format || 'Online',
        isOnline: Boolean(isOnline),
        duration: duration || null,
        price: price || null,
        instructor: instructor || 'Belajar Ads Mentor',
        startDate: startDate || null,
        registrationStatus: registrationStatus || 'AVAILABLE',
        featuredImage: featuredImage || null,
        ctaTextId: ctaTextId || 'Daftar Sekarang',
        ctaTextEn: ctaTextEn || 'Register Now',
        registrationUrl: registrationUrl || null,
        isFeatured: Boolean(isFeatured),
        metaTitleId: metaTitleId || finalNameId,
        metaTitleEn: metaTitleEn || finalNameEn,
        metaDescId: metaDescId || finalDescId,
        metaDescEn: metaDescEn || finalDescEn,
      },
    });

    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    console.error('Failed to create program:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
