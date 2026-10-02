import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME } from '@/lib/constants';
export { ADMIN_COOKIE_NAME };

function getJwtSecret(): string {
  const secret = process.env.AUTH_SECRET;
  const isProd = process.env.NODE_ENV === 'production';

  if (!secret || secret.trim() === '') {
    if (isProd) {
      throw new Error(
        '[SECURITY FATAL] AUTH_SECRET environment variable is missing in production. Application will not sign or verify authentication tokens.'
      );
    }
    // Development-only fallback secret (explicitly prohibited in production)
    return 'belajar_ads_jwt_secret_dev_2026_super_secure_key_12345';
  }

  if (isProd && secret.length < 32) {
    throw new Error(
      '[SECURITY FATAL] AUTH_SECRET in production must be at least 32 characters in length for cryptographic security.'
    );
  }

  return secret;
}

export interface AdminSession {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signAdminToken(payload: AdminSession): string {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminSession | null {
  try {
    const secret = getJwtSecret();
    return jwt.verify(token, secret) as AdminSession;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}
