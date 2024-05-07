import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import SSOButton from '@c/sso-button';

import LoginPageBanner from '@p/login-page-banner.jpg';

import { createClient } from '@/lib/utils/supabase/server';

export default async function LoginPage() {
  if ((await createClient().auth.getUser()).data.user !== null)
    return redirect('/inbox');
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center py-8 h-screen">
        <div className="mx-auto grid w-[350px] gap-4">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Sign in with your Google account
            </p>
          </div>
          <div className="grid gap-4">
            <SSOButton />
            <div className="mt-2 text-center text-sm">
              Don&apos;t have an account?
              <Link className="underline ml-2" href="#">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.9] grayscale"
          height="1080"
          src={LoginPageBanner}
          style={{
            aspectRatio: '1920/1080',
            objectFit: 'cover',
          }}
          width="1920"
        />
      </div>
    </div>
  );
}
