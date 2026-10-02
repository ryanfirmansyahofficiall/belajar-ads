import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(events);
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
      category,
      date,
      time,
      location,
      isOnline,
      speaker,
      speakerRoleId,
      speakerRoleEn,
      speakerRole, // legacy fallback
      speakerImage,
      descriptionId,
      descriptionEn,
      description, // legacy fallback
      agendaId,
      agendaEn,
      agenda, // legacy fallback
      whatYouWillLearnId,
      whatYouWillLearnEn,
      whoShouldAttendId,
      whoShouldAttendEn,
      price,
      registrationUrl,
      capacity,
      status,
      eventImage,
      gallery,
      metaTitleId,
      metaTitleEn,
      metaDescId,
      metaDescEn,
    } = body;

    const finalTitleId = titleId || title || '';
    const finalTitleEn = titleEn || finalTitleId;
    const finalDescId = descriptionId || description || '';
    const finalDescEn = descriptionEn || finalDescId;

    if (!finalTitleId || !slug || !date || !finalDescId) {
      return NextResponse.json(
        { error: 'Title (ID), slug, date, and description (ID) are required.' },
        { status: 400 }
      );
    }

    const existing = await prisma.event.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Slug must be unique.' }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        titleId: finalTitleId,
        titleEn: finalTitleEn,
        slug,
        category: category || 'WORKSHOP',
        date,
        time: time || null,
        location: location || 'Online via Zoom',
        isOnline: Boolean(isOnline),
        speaker: speaker || 'Belajar Ads Practitioner',
        speakerRoleId: speakerRoleId || speakerRole || null,
        speakerRoleEn: speakerRoleEn || null,
        speakerImage: speakerImage || null,
        descriptionId: finalDescId,
        descriptionEn: finalDescEn,
        agendaId: agendaId || (typeof agenda === 'string' ? agenda : JSON.stringify(agenda || [])),
        agendaEn: agendaEn || null,
        whatYouWillLearnId: whatYouWillLearnId || null,
        whatYouWillLearnEn: whatYouWillLearnEn || null,
        whoShouldAttendId: whoShouldAttendId || null,
        whoShouldAttendEn: whoShouldAttendEn || null,
        price: price || 'Free / Community',
        registrationUrl: registrationUrl || null,
        capacity: capacity || null,
        status: status || 'UPCOMING',
        eventImage: eventImage || null,
        gallery: typeof gallery === 'string' ? gallery : JSON.stringify(gallery || []),
        metaTitleId: metaTitleId || finalTitleId,
        metaTitleEn: metaTitleEn || finalTitleEn,
        metaDescId: metaDescId || finalDescId,
        metaDescEn: metaDescEn || finalDescEn,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Failed to create event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
