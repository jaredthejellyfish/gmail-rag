import { ParseGmailApi } from 'gmail-api-parse-message-ts';
import React from 'react';

import listGmailMessages from '@u/google/listGmailMessages';

import { Separator } from '@/components/ui/separator';

import UnreadSwitch from '../../../components/unread-switch';
import InboxEmails from './inbox-emails';

async function Inbox({
  searchParams: { page },
}: {
  searchParams: { page: string | undefined };
}) {
  const { messages } = await listGmailMessages(50, "all", page);
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
        <InboxEmails parsedMessages={parsedMessages} />
      </div>
    </section>
  );
}

export default Inbox;
