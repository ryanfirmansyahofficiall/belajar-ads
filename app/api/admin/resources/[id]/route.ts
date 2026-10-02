import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const item = await prisma.resource.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const existing = await prisma.resource.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const updated = await prisma.resource.update({
      where: { id: params.id },
      data: {
        titleId: body.titleId ?? (body.title !== undefined ? body.title : existing.titleId),
        titleEn: body.titleEn !== undefined ? body.titleEn : existing.titleEn,
        slug: body.slug ?? existing.slug,
        type: body.type ?? existing.type,
        category: body.category !== undefined ? body.category : existing.category,
        excerptId: body.excerptId ?? (body.excerpt !== undefined ? body.excerpt : existing.excerptId),
        excerptEn: body.excerptEn !== undefined ? body.excerptEn : existing.excerptEn,
        contentId: body.contentId ?? (body.content !== undefined ? body.content : existing.contentId),
        contentEn: body.contentEn !== undefined ? body.contentEn : existing.contentEn,
        downloadUrl: body.downloadUrl !== undefined ? body.downloadUrl : existing.downloadUrl,
        featuredImage: body.featuredImage !== undefined ? body.featuredImage : existing.featuredImage,
        isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : existing.isPublished,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update resource error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.resource.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
