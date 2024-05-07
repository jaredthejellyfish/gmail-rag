import { formatDistanceToNow } from 'date-fns';
import { ParseGmailApi } from 'gmail-api-parse-message-ts';
import React from 'react';

import InboxEmail from '@c/inbox-email';

import listGmailMessages from '@u/google/listGmailMessages';

import { Separator } from '@/components/ui/separator';
import UnreadSwitch from './unread-switch';

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

async function Inbox({
  searchParams: { page },
}: {
  searchParams: { page: string | undefined };
}) {
  const { messages } = await listGmailMessages(50, page);
  const emailParser = new ParseGmailApi();

  const parsedMessages = messages?.map((email) => {
    const parsedEmail = emailParser.parseMessage(email);
    return parsedEmail;
  });

  return (
    <section className="bg-black flex flex-col max-h-screen pb-5">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Inbox</h1>
        <UnreadSwitch />
      </div>
      <Separator />
      <div className="px-3 flex flex-col gap-2 overflow-y-scroll max-h-full py-2">
        {parsedMessages?.map((email) => (
          <InboxEmail
            key={email.id}
            id={email.id ?? '0'}
            sender={email.from.name ?? email.from.email ?? 'Unknown sender'}
            date={formatDistanceToNow(new Date(email.sentDate ?? 0))}
            subject={email.subject ?? 'No subject'}
            body={
              !!email.snippet
                ? unescapeHTML(email.snippet)
                : "We couldn't load this email..."
            }
            labels={
              email.labelIds?.map((label) => label.toLocaleLowerCase()) ?? []
            }
            unread={email.labelIds?.includes('UNREAD') ?? false}
          />
        ))}
      </div>
    </section>
  );
}

export default Inbox;
