'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { addSearchParam, removeSearchParam } from '@u/searchParams';

import inboxModeStore from '@/lib/store/inbox-mode.store';

function UnreadSwitch() {
  const searchParams = useSearchParams();

  const initialUnread = searchParams.get('unread') === 'true';

  const { set } = inboxModeStore();

  const [activeTab, setActiveTab] = useState<number>(initialUnread ? 1 : 0);

  useEffect(() => {
    set(initialUnread ? 'unread' : 'all');
  }, [initialUnread, set]);

  const handleClick = (tab: number) => {
    setActiveTab(tab);

    tab === 0 ? removeSearchParam('unread') : addSearchParam('unread', 'true');

    set(tab === 0 ? 'all' : 'unread');
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ml-auto"
      tabIndex={0}
      data-orientation="horizontal"
      style={{ outline: 'none' }}
    >
      <button
        type="button"
        role="tab"
        aria-selected="true"
        aria-controls="radix-:rtp:-content-all"
        onClick={() => handleClick(0)}
        data-state={activeTab === 0 ? 'active' : 'inactive'}
        id="radix-:rtp:-trigger-all"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow text-zinc-600 dark:text-zinc-200"
        tabIndex={0}
        data-orientation="horizontal"
        data-radix-collection-item=""
      >
        All mail
      </button>
      <button
        onClick={() => handleClick(1)}
        type="button"
        role="tab"
        aria-selected="false"
        aria-controls="radix-:rtp:-content-unread"
        data-state={activeTab === 1 ? 'active' : 'inactive'}
        id="radix-:rtp:-trigger-unread"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow text-zinc-600 dark:text-zinc-200"
        tabIndex={-1}
        data-orientation="horizontal"
        data-radix-collection-item=""
      >
        Unread
      </button>
    </div>
  );
}

export default UnreadSwitch;
