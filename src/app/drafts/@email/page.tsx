import { ParseGmailApi } from 'gmail-api-parse-message-ts';
import { google } from 'googleapis';
import {
  Archive,
  ArchiveX,
  Clock1,
  EllipsisVertical,
  Forward,
  Reply,
  ReplyAll,
  Trash2,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@c/ui/avatar';

import getOAuthClient from '@u/google/getOAuthClient';
import { Separator } from '@/components/ui/separator';

const Letter = dynamic(() => import('@/components/email/letter'), { ssr: false });

type Props = {
  searchParams: { id: string | undefined };
};

const initialsFromName = (name: string) => {
  const [first, last] = name.split(' ');
  if (!last && first) return first[0];
  if (first && last) return `${first[0]}${last[0]}`;
  return '';
};

async function Email({ searchParams: { id } }: Props) {
  if (!id) return <div>No data</div>;

  const oauth2Client = await getOAuthClient();

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const data = await gmail.users.drafts.get({
    userId: 'me',
    id,
  });

  const email = new ParseGmailApi().parseMessage(data.data);

  return (
    <div className="w-full bg-neutral-900 h-full max-h-screen overflow-scroll flex flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            data-state="closed"
          >
            <Archive className="h-4 w-4" />
            <span className="sr-only">Archive</span>
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            data-state="closed"
          >
            <ArchiveX className="h-4 w-4" />
            <span className="sr-only">Move to junk</span>
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            data-state="closed"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Move to trash</span>
          </button>
          <div
            data-orientation="vertical"
            role="none"
            className="shrink-0 bg-border w-[1px] mx-1 h-6"
          ></div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            data-state="closed"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r1g:"
          >
            <Clock1 className="h-4 w-4" />
            <span className="sr-only">Snooze</span>
          </button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            data-state="closed"
          >
            <Reply className="h-4 w-4" />
            <span className="sr-only">Reply</span>
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            data-state="closed"
          >
            <ReplyAll className="h-4 w-4" />
            <span className="sr-only">Reply all</span>
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            data-state="closed"
          >
            <Forward className="h-4 w-4" />
            <span className="sr-only">Forward</span>
          </button>
        </div>
        <div
          data-orientation="vertical"
          role="none"
          className="shrink-0 bg-border w-[1px] mx-2 h-6"
        ></div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
          type="button"
          id="radix-:r1k:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        >
          <EllipsisVertical className="h-4 w-4" />
          <span className="sr-only">More</span>
        </button>
      </div>
      <Separator />
      <div className="flex flex-row justify-start bg-black p-3 gap-x-3">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>{initialsFromName(email.from.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center">
          <span className="font-semibold text-base">{email.from.name}</span>
          <span className="text-sm text-neutral-400">{email.subject}</span>
        </div>
        <span className="text-sm text-neutral-500 ml-auto">
          {new Date(email.sentDate).toLocaleDateString()}:{' '}
          {new Date(email.sentDate).toLocaleTimeString()}
        </span>
      </div>
      <Separator />
      <div className="p-4">
        {email.textHtml && <Letter data={email} />}
      </div>
    </div>
  );
}

export default Email;
