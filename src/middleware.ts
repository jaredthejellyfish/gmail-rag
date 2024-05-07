import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@u/supabase/middleware';

export async function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const url = request.nextUrl.clone();

  const expiryDate = cookieStore.get('google_access_token_expiry');
  const accessToken = cookieStore.get('google_access_token');
  const refreshToken = cookieStore.get('google_refresh _token');

  if (url.pathname === '/auth/login') return await updateSession(request);

  if (
    url.pathname === '/api/gmail/refresh-token' ||
    (!accessToken?.value && !refreshToken?.value)
  )
    return await updateSession(request);

  if (Date.now() < Number(expiryDate?.value ?? 0)) {
    return await updateSession(request);
  }

  url.pathname = `/api/gmail/refresh-token`;
  url.searchParams.set('next', request.nextUrl.href);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
