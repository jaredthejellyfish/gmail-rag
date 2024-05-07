import { google } from 'googleapis';
import { cookies } from 'next/headers';

import { env } from '@/env';

export default async function getOAuthClient() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('google_access_token');
  const refreshToken = cookieStore.get('google_refresh_token');
  const expiryDate =
    cookieStore.get('google_access_token_expiry')?.value ?? '0';

  if (!accessToken || !refreshToken) {
    throw new Error('Unauthorized');
  }

  const oauth2Client = new google.auth.OAuth2(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
  );

  oauth2Client.setCredentials({
    access_token: accessToken.value,
    refresh_token: refreshToken.value,
    expiry_date: Number(expiryDate),
  });

  return oauth2Client;
}
