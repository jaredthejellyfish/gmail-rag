'use client';

import React from 'react';

import { Button } from '@c/ui/button';

import { env } from '@/env';
import { createClient } from '@/lib/utils/supabase/client';

function SSOButton() {
  const supabase = createClient();
  return (
    <Button
      onClick={async () => {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo:
              env.NEXT_PUBLIC_VERCEL_ENV === 'production'
                ? 'https://gmail-rag.vercel.app/api/auth/callback'
                : 'http://localhost:3000/api/auth/callback',
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
            scopes: [
              'https://www.googleapis.com/auth/userinfo.email',
              'https://www.googleapis.com/auth/userinfo.profile',
              'https://www.googleapis.com/auth/gmail.readonly',
              'https://www.googleapis.com/auth/gmail.modify',
              'https://www.googleapis.com/auth/gmail.compose',
              'https://mail.google.com/',
            ].join(' '),
          },
        });
      }}
      className="py-6"
      variant="outline"
      autoFocus
    >
      <ChromeIcon className="mr-2 h-5 w-5" />
      Sign in with Google
    </Button>
  );
}

export default SSOButton;

function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
