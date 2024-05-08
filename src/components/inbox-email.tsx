'use client';

import React from 'react';

import currentEmailStore from '@/lib/store/current-email.store';
import { cn } from '@/lib/utils';

type Props = {
  sender: string;
  id: string;
  date: string;
  subject: string;
  body: string;
  labels: string[];
  unread: boolean;
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

function InboxEmail({
  sender,
  date,
  subject,
  body,
  labels,
  unread,
  id,
}: Props) {
  const { set, id: currentId } = currentEmailStore();
  return (
    <button
      onClick={() => {
        set(id);
      }}
      className={cn(
        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-colors hover:bg-neutral-300/20 bg-muted w-full',
        currentId === id && 'border-white/40',
      )}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          {sender.length ? (
            <div className="flex items-center gap-2">
              <div className="font-semibold">
                {sender.slice(0, 28).replace('"', '').trim()}
                {sender.length > 28 && '...'}
              </div>
              {unread && (
                <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
              )}
            </div>
          ) : null}
          <div className="ml-auto text-xs text-foreground lg:block hidden">
            {date}
          </div>
        </div>
        <div className="text-xs font-medium">{subject}</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {body}...
      </div>
      <div className="flex items-center gap-2">
        {labels.map((label) => (
          <Label key={label} label={label} />
        ))}
      </div>
    </button>
  );
}

function Label({ label }: { label: string }) {
  if (!label.startsWith('category_')) return null;
  return (
    <div className="inline-flex px-2 items-center rounded-md border py-[1px] text-[0.6em] border-neutral-500 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80">
      {capitalize(label.split('_').slice(1).join(' '))}
    </div>
  );
}

export default InboxEmail;
