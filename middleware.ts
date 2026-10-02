import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/constants';

async function verifyJwtEdge(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const [headerB64, payloadB64, signatureB64] = parts;

    // Decode base64url payload to verify expiration
    let base64Payload = payloadB64.replace(/-/g, '+').replace(/_/g, '/');
    while (base64Payload.length % 4) base64Payload += '=';
    const payloadStr = atob(base64Payload);
    const payload = JSON.parse(payloadStr);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false;
    }

    const secretStr =
      process.env.AUTH_SECRET ||
      (process.env.NODE_ENV === 'production'
        ? ''
        : 'belajar_ads_jwt_secret_dev_2026_super_secure_key_12345');

    if (!secretStr) return false;

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secretStr),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);

    let base64Sig = signatureB64.replace(/-/g, '+').replace(/_/g, '/');
    while (base64Sig.length % 4) base64Sig += '=';
    const binarySig = atob(base64Sig);
    const sigBytes = new Uint8Array(binarySig.length);
    for (let i = 0; i < binarySig.length; i++) {
      sigBytes[i] = binarySig.charCodeAt(i);
    }

    return await crypto.subtle.verify('HMAC', key, sigBytes, data);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Forward pathname header for server components in layout
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // 1. Ignore static assets, images, API routes, favicon, robots, sitemap
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.includes('.')
  ) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // 2. Handle Admin Route Protection with Cryptographic Verification
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValidSession = await verifyJwtEdge(token);

    if (!isValidSession && !isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      const response = NextResponse.redirect(url);
      if (token) {
        response.cookies.delete(ADMIN_COOKIE_NAME);
      }
      return response;
    }

    if (isValidSession && isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }

    const response = NextResponse.next({ request: { headers: requestHeaders } });
    if (!isValidSession && isLoginPage && token) {
      response.cookies.delete(ADMIN_COOKIE_NAME);
    }
    return response;
  }

  // 3. Gracefully redirect legacy /id/* and /en/* URLs to canonical single-route paths
  if (pathname === '/id' || pathname === '/en') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/id/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('/id', '');
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('/en', '');
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
