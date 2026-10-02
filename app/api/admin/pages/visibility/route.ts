import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { pageKey, isVisible } = body;

    if (!pageKey || typeof isVisible !== 'boolean') {
      return NextResponse.json({ error: 'pageKey and isVisible (boolean) are required' }, { status: 400 });
    }

    const norm = pageKey.toLowerCase().replace(/_/g, '-');
    const under = norm.replace(/-/g, '_');

    // Update or create for normalized key
    await prisma.pageVisibility.upsert({
      where: { pageKey: norm },
      update: { isVisible },
      create: {
        pageKey: norm,
        name: norm.replace(/-/g, ' ').toUpperCase(),
        route: `/${norm === 'homepage' ? '' : norm}`,
        isVisible,
      },
    });

    // Also update underscore variant if exists
    try {
      await prisma.pageVisibility.updateMany({
        where: { pageKey: under },
        data: { isVisible },
      });
    } catch {
      // Ignored if underscore variant does not exist
    }

    return NextResponse.json({ success: true, pageKey: norm, isVisible });
  } catch (error) {
    console.error('Failed to update page visibility:', error);
    return NextResponse.json({ error: 'Failed to update page visibility' }, { status: 500 });
  }
}
