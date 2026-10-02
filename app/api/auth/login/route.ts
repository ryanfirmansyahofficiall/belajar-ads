import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

/**
 * In-Memory Rate Limiter for Login Protection
 * Tracks consecutive failed authentication attempts per client IP.
 * NOTE: Designed for development and single-instance Node.js production.
 * In distributed multi-worker environments, an external shared store (Redis/Memcached)
 * or reverse-proxy rate limiting (Cloudflare / cPanel mod_evasive) is recommended.
 */
interface RateLimitRecord {
  failedAttempts: number;
  lockedUntil: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || '127.0.0.1';
}

function checkRateLimit(ip: string): { allowed: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) return { allowed: true };

  if (record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingSeconds };
  }

  // If lockout expired, reset
  if (record.lockedUntil > 0 && record.lockedUntil <= now) {
    loginAttempts.delete(ip);
  }

  return { allowed: true };
}

function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { failedAttempts: 0, lockedUntil: 0 };
  record.failedAttempts += 1;

  if (record.failedAttempts >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
  }

  loginAttempts.set(ip, record);
}

function recordSuccessfulLogin(ip: string) {
  loginAttempts.delete(ip);
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimitStatus = checkRateLimit(clientIp);

  if (!rateLimitStatus.allowed) {
    return NextResponse.json(
      {
        error: `Terlalu banyak percobaan login gagal. Akses dibatasi selama ${Math.ceil(
          (rateLimitStatus.remainingSeconds || 60) / 60
        )} menit untuk keamanan.`,
      },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.toLowerCase().trim();

    const admin = await prisma.adminUser.findUnique({
      where: { email: trimmedEmail },
    });

    if (!admin) {
      recordFailedAttempt(clientIp);
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, admin.password);
    if (!isMatch) {
      recordFailedAttempt(clientIp);
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Success: clear rate limit counter
    recordSuccessfulLogin(clientIp);

    const token = signAdminToken({
      userId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

    // Set HTTP-only secure cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error during authentication.' },
      { status: 500 }
    );
  }
}
