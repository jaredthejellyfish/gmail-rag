'use client';

import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import type { IEmail } from 'gmail-api-parse-message-ts';
import React from 'react';

import InboxEmail from '@/components/inbox-email';
import inboxModeStore from '@/lib/store/inbox-mode.store';

type Props = { parsedMessages: IEmail[] | undefined };

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

const getEmails = async (max: number, filter: 'all' | 'unread') => {
  const res = await fetch(`/api/gmail/list?max=${max}&filter=${filter}`, {
    method: 'GET',
  });
  return (await res.json()) as IEmail[];
};

function InboxEmails({ parsedMessages }: Props) {
  const { status } = inboxModeStore();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['inbox-emails', status],
    queryFn: async () =>
      await getEmails(50, status === 'unread' ? 'unread' : 'all'),
    initialData: parsedMessages,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading || isFetching)
    return new Array(5)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm animate-pulse bg-gradient-to-br from-neutral-600 via-neutral-700 to-neutral-800 transition-all hover:bg-accent bg-muted w-full h-[142px]"
        ></div>
      ));
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No emails found</p>;

  return data?.map((email) => (
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
      labels={email.labelIds?.map((label) => label.toLocaleLowerCase()) ?? []}
      unread={email.labelIds?.includes('UNREAD') ?? false}
    />
  ));
}

export default InboxEmails;
