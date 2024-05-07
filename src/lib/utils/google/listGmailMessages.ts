import { google } from 'googleapis';

import getOAuthClient from './getOAuthClient';

export default async function listGmailMessages(
  maxResults: number,
  page?: string,
) {
  {
    const oauth2Client = await getOAuthClient();

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    try {
      const response = await gmail.users.messages.list({
        userId: 'me',
        includeSpamTrash: false,
        pageToken: page,
        labelIds: ['INBOX'],
        maxResults,
      });

      const messages = await Promise.all(
        response.data.messages?.map(async (message) => {
          const messageData = await gmail.users.messages.get({
            userId: 'me',
            id: message.id!,
          });

          return messageData.data;
        }) ?? [],
      );

      return { messages: messages.map((message) => message), error: null };
    } catch (error) {
      return { messages: null, error: (error as Error).message };
    }
  }
}
