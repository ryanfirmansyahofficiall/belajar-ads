import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { siteConfig } from '@/config/site';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = await prisma.siteSetting.findMany();
  const settingsMap: Record<string, string> = {
    COMMUNITY_URL: siteConfig.links.community,
    WHATSAPP_URL: siteConfig.links.whatsapp,
    INSTAGRAM_URL: siteConfig.links.instagram,
    FACEBOOK_URL: siteConfig.links.facebook,
    YOUTUBE_URL: siteConfig.links.youtube,
    LMS_URL: siteConfig.links.lms,
    EMAIL_CONTACT: siteConfig.links.email,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || '',
    NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
  };

  for (const s of settings) {
    settingsMap[s.key] = s.value;
  }

  return NextResponse.json(settingsMap);
}

const ALLOWED_SETTING_KEYS = new Set([
  'COMMUNITY_URL',
  'WHATSAPP_URL',
  'INSTAGRAM_URL',
  'FACEBOOK_URL',
  'YOUTUBE_URL',
  'LMS_URL',
  'PAYMENT_URL',
  'EMAIL_CONTACT',
  'NEXT_PUBLIC_GA_ID',
  'NEXT_PUBLIC_META_PIXEL_ID',
]);

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Require administrative role
  if (session.role !== 'SUPERADMIN' && session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden: Insufficient privileges.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload format' }, { status: 400 });
    }

    for (const [key, value] of Object.entries(body)) {
      if (ALLOWED_SETTING_KEYS.has(key) && typeof value === 'string') {
        const sanitizedValue = value.trim().slice(0, 500);
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: sanitizedValue },
          create: { key, value: sanitizedValue },
        });
      }
    }

    try {
      const { revalidatePath } = await import('next/cache');
      revalidatePath('/', 'layout');
    } catch {
      // Ignore if revalidation is not supported in this runtime
    }

    return NextResponse.json({ success: true, message: 'Settings updated successfully.' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
