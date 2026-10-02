import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const program = await prisma.program.findUnique({
    where: { id: params.id },
  });

  if (!program) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(program);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const existing = await prisma.program.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (body.slug && body.slug !== existing.slug) {
      const match = await prisma.program.findUnique({ where: { slug: body.slug } });
      if (match) return NextResponse.json({ error: 'Slug taken' }, { status: 400 });
    }

    const updated = await prisma.program.update({
      where: { id: params.id },
      data: {
        nameId: body.nameId ?? (body.name !== undefined ? body.name : existing.nameId),
        nameEn: body.nameEn !== undefined ? body.nameEn : existing.nameEn,
        slug: body.slug ?? existing.slug,
        category: body.category ?? existing.category,
        topic: body.topic ?? existing.topic,
        descriptionId: body.descriptionId ?? (body.description !== undefined ? body.description : existing.descriptionId),
        descriptionEn: body.descriptionEn !== undefined ? body.descriptionEn : existing.descriptionEn,
        overviewId: body.overviewId !== undefined ? body.overviewId : existing.overviewId,
        overviewEn: body.overviewEn !== undefined ? body.overviewEn : existing.overviewEn,
        level: body.level ?? existing.level,
        format: body.format ?? existing.format,
        isOnline: body.isOnline !== undefined ? Boolean(body.isOnline) : existing.isOnline,
        duration: body.duration !== undefined ? body.duration : existing.duration,
        price: body.price !== undefined ? body.price : existing.price,
        instructor: body.instructor !== undefined ? body.instructor : existing.instructor,
        startDate: body.startDate !== undefined ? body.startDate : existing.startDate,
        registrationStatus: body.registrationStatus ?? existing.registrationStatus,
        featuredImage: body.featuredImage !== undefined ? body.featuredImage : existing.featuredImage,
        ctaTextId: body.ctaTextId ?? existing.ctaTextId,
        ctaTextEn: body.ctaTextEn ?? existing.ctaTextEn,
        registrationUrl: body.registrationUrl !== undefined ? body.registrationUrl : existing.registrationUrl,
        isFeatured: body.isFeatured !== undefined ? Boolean(body.isFeatured) : existing.isFeatured,
        metaTitleId: body.metaTitleId ?? existing.metaTitleId,
        metaTitleEn: body.metaTitleEn ?? existing.metaTitleEn,
        metaDescId: body.metaDescId ?? existing.metaDescId,
        metaDescEn: body.metaDescEn ?? existing.metaDescEn,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update program:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.program.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
