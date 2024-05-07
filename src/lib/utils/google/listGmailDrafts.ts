import { google } from 'googleapis';

import getOAuthClient from './getOAuthClient';

export default async function listGmailDrafts(maxResults: number) {
  {
    const oauth2Client = await getOAuthClient();

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    try {
      const response = await gmail.users.drafts.list({
        userId: 'me',
        includeSpamTrash: false,
        maxResults,
      });

      const drafts = await Promise.all(
        response.data.drafts?.map(async (draft) => {
          const messageData = await gmail.users.drafts.get({
            userId: 'me',
            id: draft.id!,
          });

          return messageData.data;
        }) ?? [],
      );

      return { drafts, error: null };
    } catch (error) {
      return { messages: null, error: (error as Error).message };
    }
  }
}
