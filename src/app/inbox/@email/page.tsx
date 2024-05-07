import { ParseGmailApi } from 'gmail-api-parse-message-ts';
import { google } from 'googleapis';
import dynamic from 'next/dynamic';
import React from 'react';

import getOAuthClient from '@u/google/getOAuthClient';

const Letter = dynamic(() => import('@/components/email/letter'), {
  ssr: false,
});

type Props = {
  searchParams: { id: string | undefined };
};

const prefetchEmail = async (id?: string) => {
  if (!id) {
    return { email: undefined, error: 'No data' };
  }
  try {
    const oauth2Client = await getOAuthClient();

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const data = await gmail.users.messages.get({
      userId: 'me',
      id,
      metadataHeaders: ['Subject', 'From', 'Date'],
    });

    const email = new ParseGmailApi().parseMessage(data.data);

    return { email, error: undefined };
  } catch (e) {
    return {
      email: undefined,
      error: `Error fetching email ${(e as Error).message}`,
    };
  }
};

async function Email({ searchParams: { id } }: Props) {
  const { email } = await prefetchEmail(id);

  return (
    <div className="w-full bg-neutral-900 h-full max-h-screen overflow-scroll flex flex-col">
      <Letter data={email} sId={id} />
    </div>
  );
}

export default Email;
