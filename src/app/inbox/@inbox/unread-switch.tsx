'use client';

import React, { useState } from 'react';

function UnreadSwitch() {
  const [activeTab, setActiveTab] = useState<number>(0);

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
        onClick={() => setActiveTab(0)}
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
        onClick={() => setActiveTab(1)}
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
