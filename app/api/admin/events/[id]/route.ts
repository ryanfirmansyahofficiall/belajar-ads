import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const event = await prisma.event.findUnique({ where: { id: params.id } });
  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(event);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const existing = await prisma.event.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (body.slug && body.slug !== existing.slug) {
      const match = await prisma.event.findUnique({ where: { slug: body.slug } });
      if (match) return NextResponse.json({ error: 'Slug taken' }, { status: 400 });
    }

    const updated = await prisma.event.update({
      where: { id: params.id },
      data: {
        titleId: body.titleId ?? (body.title !== undefined ? body.title : existing.titleId),
        titleEn: body.titleEn !== undefined ? body.titleEn : existing.titleEn,
        slug: body.slug ?? existing.slug,
        category: body.category ?? existing.category,
        date: body.date ?? existing.date,
        time: body.time !== undefined ? body.time : existing.time,
        location: body.location ?? existing.location,
        isOnline: body.isOnline !== undefined ? Boolean(body.isOnline) : existing.isOnline,
        speaker: body.speaker ?? existing.speaker,
        speakerRoleId: body.speakerRoleId ?? (body.speakerRole !== undefined ? body.speakerRole : existing.speakerRoleId),
        speakerRoleEn: body.speakerRoleEn !== undefined ? body.speakerRoleEn : existing.speakerRoleEn,
        speakerImage: body.speakerImage !== undefined ? body.speakerImage : existing.speakerImage,
        descriptionId: body.descriptionId ?? (body.description !== undefined ? body.description : existing.descriptionId),
        descriptionEn: body.descriptionEn !== undefined ? body.descriptionEn : existing.descriptionEn,
        agendaId: body.agendaId !== undefined ? body.agendaId : (body.agenda !== undefined ? (typeof body.agenda === 'string' ? body.agenda : JSON.stringify(body.agenda)) : existing.agendaId),
        agendaEn: body.agendaEn !== undefined ? body.agendaEn : existing.agendaEn,
        whatYouWillLearnId: body.whatYouWillLearnId !== undefined ? body.whatYouWillLearnId : existing.whatYouWillLearnId,
        whatYouWillLearnEn: body.whatYouWillLearnEn !== undefined ? body.whatYouWillLearnEn : existing.whatYouWillLearnEn,
        whoShouldAttendId: body.whoShouldAttendId !== undefined ? body.whoShouldAttendId : existing.whoShouldAttendId,
        whoShouldAttendEn: body.whoShouldAttendEn !== undefined ? body.whoShouldAttendEn : existing.whoShouldAttendEn,
        price: body.price !== undefined ? body.price : existing.price,
        registrationUrl: body.registrationUrl !== undefined ? body.registrationUrl : existing.registrationUrl,
        capacity: body.capacity !== undefined ? body.capacity : existing.capacity,
        status: body.status ?? existing.status,
        eventImage: body.eventImage !== undefined ? body.eventImage : existing.eventImage,
        metaTitleId: body.metaTitleId ?? existing.metaTitleId,
        metaTitleEn: body.metaTitleEn ?? existing.metaTitleEn,
        metaDescId: body.metaDescId ?? existing.metaDescId,
        metaDescEn: body.metaDescEn ?? existing.metaDescEn,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.event.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
