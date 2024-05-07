import { ParseGmailApi } from 'gmail-api-parse-message-ts';
import { type NextRequest, NextResponse } from 'next/server';

import listGmailMessages from '@/lib/utils/google/listGmailMessages';

export async function GET(req: NextRequest) {
  try {
    const query = new URL(req.nextUrl).searchParams;

    const maxResults = Number(query.get('max') ?? '10');
    const filter = (query.get('filter') ?? 'all') as 'all' | 'unread';

    const { messages } = await listGmailMessages(maxResults , filter);
    const emailParser = new ParseGmailApi();

    const parsedMessages = messages?.map((email) => {
      const parsedEmail = emailParser.parseMessage(email);
      return parsedEmail;
    });

    return NextResponse.json(parsedMessages);
  } catch (error) {
    console.error('The API returned an error: ' + (error as Error).message);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}
