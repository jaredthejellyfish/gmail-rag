import { formatDistanceToNow } from 'date-fns';
import { ParseGmailApi } from 'gmail-api-parse-message-ts';
import React from 'react';

import Draft from '@/components/draft-email';
import listGmailDrafts from '@/lib/utils/google/listGmailDrafts';
import { Separator } from '@/components/ui/separator';

const unescapeHTML = (str: string) =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    (tag) =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"',
      })[tag] ?? tag,
  );

async function Inbox() {
  const { drafts } = await listGmailDrafts(10);
  const emailParser = new ParseGmailApi();

  const parsedDrafts = drafts?.map((draft) => {
    const parsedDraft = emailParser.parseMessage(draft.message);
    return parsedDraft;
  });
  return (
    <section className="bg-black flex flex-col max-h-screen pb-5">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Drafts</h1>
        <span className="h-9"></span>
      </div>
      <Separator />
      <div className="px-3 flex flex-col gap-2 overflow-y-scroll max-h-full py-2">
        {parsedDrafts?.map((email) => (
          <Draft
            key={email.id}
            id={email.id ?? '0'}
            date={formatDistanceToNow(new Date(email.sentDate ?? 0))}
            subject={email.subject}
            body={
              !!email.snippet
                ? unescapeHTML(email.snippet)
                : "We couldn't load this email..."
            }
          />
        ))}
      </div>
    </section>
  );
}

export default Inbox;
