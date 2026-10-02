import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Public Lead Ingestion Rate Limiter
 * Limits form submissions per IP to prevent spam and database flooding.
 */
interface LeadRateLimit {
  count: number;
  resetAt: number;
}

const leadSubmissions = new Map<string, LeadRateLimit>();
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const WINDOW_DURATION_MS = 10 * 60 * 1000; // 10 minutes

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || '127.0.0.1';
}

function checkLeadRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = leadSubmissions.get(ip);

  if (!record || record.resetAt <= now) {
    leadSubmissions.set(ip, { count: 1, resetAt: now + WINDOW_DURATION_MS });
    return true;
  }

  if (record.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\s\-()]{7,30}$/;

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  if (!checkLeadRateLimit(clientIp)) {
    return NextResponse.json(
      { error: 'Terlalu banyak permintaan dalam waktu singkat. Silakan coba beberapa saat lagi.' },
      { status: 429 }
    );
  }

  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Payload tidak valid.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Format data tidak valid.' },
        { status: 400 }
      );
    }

    // 1. Anti-spam Honeypot Check
    // If hidden bot fields are populated, simulate success without persisting
    if (body._hp || body.website_url_trap) {
      return NextResponse.json({ success: true, leadId: 'hp_filtered' }, { status: 201 });
    }

    const {
      name,
      email,
      phone,
      company,
      participants,
      trainingNeeds,
      preferredDate,
      isOnline,
      source,
      message,
    } = body;

    // 2. Required Fields Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Nama lengkap wajib diisi (minimal 2 karakter).' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'Format alamat email tidak valid.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || !PHONE_REGEX.test(phone.trim())) {
      return NextResponse.json(
        { error: 'Nomor WhatsApp / telepon tidak valid (minimal 7 digit).' },
        { status: 400 }
      );
    }

    // 3. Length Bounds & Sanitization
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 150);
    const sanitizedPhone = phone.trim().slice(0, 30);
    const sanitizedCompany = typeof company === 'string' ? company.trim().slice(0, 150) : null;
    const sanitizedParticipants = typeof participants === 'string' ? participants.trim().slice(0, 50) : null;
    const sanitizedTrainingNeeds = typeof trainingNeeds === 'string' ? trainingNeeds.trim().slice(0, 1000) : null;
    const sanitizedPreferredDate = typeof preferredDate === 'string' ? preferredDate.trim().slice(0, 100) : null;
    const sanitizedSource = typeof source === 'string' ? source.trim().slice(0, 50) : 'CONTACT_FORM';
    const sanitizedMessage = typeof message === 'string' ? message.trim().slice(0, 3000) : null;

    const lead = await prisma.lead.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        company: sanitizedCompany || null,
        participants: sanitizedParticipants || null,
        trainingNeeds: sanitizedTrainingNeeds || null,
        preferredDate: sanitizedPreferredDate || null,
        isOnline: typeof isOnline === 'boolean' ? isOnline : true,
        source: sanitizedSource,
        message: sanitizedMessage || null,
        status: 'NEW',
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem saat menyimpan data formulir.' },
      { status: 500 }
    );
  }
}
