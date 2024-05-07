import { ParseGmailApi } from 'gmail-api-parse-message-ts';
import { google } from 'googleapis';
import { type NextRequest, NextResponse } from 'next/server';

import getOAuthClient from '@/lib/utils/google/getOAuthClient';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.clone().searchParams;
  const id = searchParams.get('id');

  if (!id) return NextResponse.json('No data', { status: 400 });

  const oauth2Client = await getOAuthClient();

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const data = await gmail.users.messages.get({
    userId: 'me',
    id,
    metadataHeaders: ['Subject', 'From', 'Date'],
  });

  const email = new ParseGmailApi().parseMessage(data.data);

  return NextResponse.json(email);
}
