import { google } from 'googleapis';
import { type NextRequest, NextResponse } from 'next/server';

import getOAuthClient from '@u/google/getOAuthClient';

export async function GET(req: NextRequest) {
  const query = new URL(req.nextUrl).searchParams;

  const maxResults = Number(query.get('max') ?? '10');

  const oauth2Client = await getOAuthClient();

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      includeSpamTrash: false,
      maxResults,
    });

    const messages = await Promise.all(
      response.data.messages?.map(async (message) => {
        const messageData = await gmail.users.messages.get({
          userId: 'me',
          id: message.id!,
          metadataHeaders: ['Subject', 'From', 'Date'],
        });

        return messageData.data;
      }) ?? [],
    );

    return NextResponse.json(messages.map((message) => message));
  } catch (error) {
    console.error('The API returned an error: ' + (error as Error).message);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}
