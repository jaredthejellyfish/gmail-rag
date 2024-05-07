import { getUnixTime } from 'date-fns';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createClient } from '@/lib/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const cookieStore = cookies();

    console.log('cookieStore', cookieStore);
    const supabase = createClient();

    console.log(code)

    const {
      error,
      data: { session },
    } = await supabase.auth.exchangeCodeForSession(code);

    console.log(session);
    console.log(error);

    if (!error && session) {
      const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

      cookieStore.set({
        name: 'google_access_token',
        value: session.provider_token ?? '',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      cookieStore.set({
        name: 'google_refresh_token',
        value: session.provider_refresh_token ?? '',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      cookieStore.set({
        name: 'google_access_token_expiry',
        value: getUnixTime(expiryDate).toString(),
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
