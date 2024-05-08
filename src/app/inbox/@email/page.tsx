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
  try {
    const oauth2Client = await getOAuthClient();

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    if (!id) {
      const data = await gmail.users.messages.list({
        userId: 'me',
        maxResults: 1,
      });

      if (!data.data.messages) {
        return { email: undefined, error: 'No emails found' };
      }

      const message = await gmail.users.messages.get({
        userId: 'me',
        id: data.data.messages?.[0]?.id ?? undefined,
      });

      if (!message) {
        return { email: undefined, error: 'No emails found' };
      }

      const email = new ParseGmailApi().parseMessage(message.data);

      return { email: email, error: undefined };
    }

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
    <div className="w-full dark:bg-neutral-900 bg-neutral-200 h-full max-h-screen overflow-scroll flex flex-col">
      <Letter data={email} sId={id ?? email?.id} />
    </div>
  );
}

export default Email;
