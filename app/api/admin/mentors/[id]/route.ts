import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const mentor = await prisma.mentor.findUnique({ where: { id: params.id } });
  if (!mentor) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(mentor);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const existing = await prisma.mentor.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const updated = await prisma.mentor.update({
      where: { id: params.id },
      data: {
        name: body.name ?? existing.name,
        roleId: body.roleId ?? (body.role !== undefined ? body.role : existing.roleId),
        roleEn: body.roleEn !== undefined ? body.roleEn : existing.roleEn,
        photo: body.photo !== undefined ? body.photo : existing.photo,
        bioId: body.bioId ?? (body.bio !== undefined ? body.bio : existing.bioId),
        bioEn: body.bioEn !== undefined ? body.bioEn : existing.bioEn,
        expertiseId: body.expertiseId ?? (body.expertise !== undefined ? body.expertise : existing.expertiseId),
        expertiseEn: body.expertiseEn !== undefined ? body.expertiseEn : existing.expertiseEn,
        socialUrl: body.socialUrl !== undefined ? body.socialUrl : existing.socialUrl,
        order: body.order !== undefined ? Number(body.order) : existing.order,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update mentor error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.mentor.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
