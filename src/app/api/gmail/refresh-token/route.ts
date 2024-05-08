import { google } from 'googleapis';
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import type { NextURL } from 'next/dist/server/web/next-url';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { env } from '@/env';

const baseUrl = (nextUrl: NextURL) => {
  const newUrl = nextUrl.clone();
  newUrl.searchParams.delete('next');
  newUrl.pathname = '/';
  return newUrl.toString();
};

export async function GET(req: NextRequest) {
  const cookieStore = cookies();

  const url = req.nextUrl.clone();
  const nextUrl = !!url.searchParams.get('next')
    ? decodeURIComponent(url.searchParams.get('next') ?? '')
    : baseUrl(req.nextUrl);

  const accessToken = cookieStore.get('google_access_token');
  const refreshToken = cookieStore.get('google_refresh_token');
  const expiryDate = cookieStore.get('google_access_token_expiry');

  if (Date.now() < Number(expiryDate?.value ?? 0))
    return NextResponse.redirect(nextUrl);
  if (!accessToken || !refreshToken) return NextResponse.redirect(nextUrl);

  const oauth2Client = new google.auth.OAuth2(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
  );

  oauth2Client.setCredentials({
    access_token: accessToken.value,
    refresh_token: refreshToken.value,
    expiry_date: Number(expiryDate),
  });

  const { credentials } = await oauth2Client.refreshAccessToken();

  if (
    !credentials.access_token ||
    !credentials.expiry_date ||
    !credentials.refresh_token
  )
    return NextResponse.redirect(nextUrl);

  cookieStore.set({
    name: 'google_access_token',
    value: credentials.access_token,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  } as RequestCookie);

  cookieStore.set({
    name: 'google_refresh_token',
    value: credentials.refresh_token,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  } as RequestCookie);

  cookieStore.set({
    name: 'google_access_token_expiry',
    value: credentials.expiry_date.toString(),
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  } as RequestCookie);

  return NextResponse.redirect(nextUrl);
}
