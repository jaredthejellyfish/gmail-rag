import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createClient } from '@/lib/utils/supabase/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();

  await supabase.auth.signOut();

  const cookieStore = cookies();

  cookieStore.delete('google_access_token');
  cookieStore.delete('google_refresh_token');
  cookieStore.delete('google_access_token_expiry');

  return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
}
