'use client';

import { useQuery } from '@tanstack/react-query';
import type { IEmail } from 'gmail-api-parse-message-ts';
import React, { useEffect } from 'react';
import { Letter as ReactLetter } from 'react-letter';

import { Separator } from '@/components/ui/separator';
import currentEmailStore from '@/lib/store/current-email.store';
import { setSearchParam } from '@/lib/utils';

import { Avatar, AvatarFallback } from '../ui/avatar';
import EmailHeader from './email-header';
import EmailSkeleton from './email-skeleton';

type Props = {
  data?: IEmail;
  sId?: string;
};

const initialsFromName = (name: string) => {
  const [first, last] = name.split(' ');
  if (!last && first) return first[0];
  if (first && last) return `${first[0]}${last[0]}`;
  return '';
};

const getEmail = async (id: string | null) => {
  if (!id) return null;
  const res = await fetch('/api/gmail/get?id=' + id, { method: 'GET' });
  return (await res.json()) as IEmail;
};

function Letter({ data: email, sId }: Props) {
  const { id } = currentEmailStore();

  const validId = id.length ? id : sId;

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['email', validId],
    queryFn: async () => await getEmail(validId ?? null),
    initialData: email,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data && (id ?? sId)) {
      setSearchParam('id', data.id);
    }
  }, [id, sId, validId, data]);

  if (isLoading || isFetching) return <EmailSkeleton />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data)
    return (
      <>
        <EmailHeader />
        <Separator />
      </>
    );

  return (
    <>
      <EmailHeader />
      <Separator />

      <div className="flex flex-row justify-start dark:bg-black bg-white p-3 gap-x-3">
        <Avatar>
          <AvatarFallback>{initialsFromName(data.from.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center">
          <span className="font-semibold text-base">{data.from.name}</span>
          <span className="text-sm text-neutral-400">{data.subject}</span>
        </div>
        <span className="text-sm text-neutral-500 ml-auto">
          {new Date(data.sentDate).toLocaleDateString()}:
          {new Date(data.sentDate).toLocaleTimeString()}
        </span>
      </div>
      <Separator />
      <div className="p-4">
        {data && <ReactLetter className="h-full" html={data?.textHtml ?? ''} />}
      </div>
    </>
  );
}

export default Letter;
