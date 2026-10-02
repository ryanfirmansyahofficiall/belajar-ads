import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const mentors = await prisma.mentor.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(mentors);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { 
      name, 
      roleId, 
      roleEn, 
      role, 
      photo, 
      bioId, 
      bioEn, 
      bio, 
      expertiseId, 
      expertiseEn, 
      expertise, 
      socialUrl, 
      order 
    } = body;

    const finalRoleId = roleId || role || '';
    const finalRoleEn = roleEn || finalRoleId;
    const finalBioId = bioId || bio || '';
    const finalBioEn = bioEn || finalBioId;
    const finalExpId = expertiseId || expertise || 'Meta Ads Specialist';
    const finalExpEn = expertiseEn || finalExpId;

    if (!name || !finalRoleId || !finalBioId) {
      return NextResponse.json({ error: 'Name, role, and bio are required.' }, { status: 400 });
    }

    const mentor = await prisma.mentor.create({
      data: {
        name,
        roleId: finalRoleId,
        roleEn: finalRoleEn,
        photo: photo || null,
        bioId: finalBioId,
        bioEn: finalBioEn,
        expertiseId: finalExpId,
        expertiseEn: finalExpEn,
        socialUrl: socialUrl || null,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(mentor, { status: 201 });
  } catch (error) {
    console.error('Create mentor error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
