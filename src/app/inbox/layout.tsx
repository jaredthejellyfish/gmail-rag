'use client';

import React, { Suspense, useState } from 'react';

import Sidebar from '@c/sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@c/ui/resizable';

import EmailSkeleton from '@/components/email/email-skeleton';
import { Separator } from '@/components/ui/separator';

function InboxSkeleton() {
  return (
    <section className="dark:bg-black bg-white flex flex-col max-h-screen pb-5 h-screen">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Inbox</h1>
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
            data-state="active"
            id="radix-:rtp:-trigger-all"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow text-zinc-600 dark:text-zinc-200"
            tabIndex={0}
            data-orientation="horizontal"
            data-radix-collection-item=""
          >
            All mail
          </button>
          <button
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="radix-:rtp:-content-unread"
            data-state="inactive"
            id="radix-:rtp:-trigger-unread"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow text-zinc-600 dark:text-zinc-200"
            tabIndex={-1}
            data-orientation="horizontal"
            data-radix-collection-item=""
          >
            Unread
          </button>
        </div>
      </div>
      <Separator />
      <div className="px-3 flex flex-col gap-2 overflow-y-scroll max-h-full py-2">
        <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm animate-pulse bg-gradient-to-br dark:from-neutral-600 dark:via-neutral-700 dark:to-neutral-800 from-neutral-200 via-neutral-300 to-neutral-400 transition-all hover:bg-accent bg-muted w-full h-[142px]"></div>
        <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm animate-pulse bg-gradient-to-br dark:from-neutral-600 dark:via-neutral-700 dark:to-neutral-800 from-neutral-200 via-neutral-300 to-neutral-400 transition-all hover:bg-accent bg-muted w-full h-[142px]"></div>
        <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm animate-pulse bg-gradient-to-br dark:from-neutral-600 dark:via-neutral-700 dark:to-neutral-800 from-neutral-200 via-neutral-300 to-neutral-400 transition-all hover:bg-accent bg-muted w-full h-[142px]"></div>
        <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm animate-pulse bg-gradient-to-br dark:from-neutral-600 dark:via-neutral-700 dark:to-neutral-800 from-neutral-200 via-neutral-300 to-neutral-400 transition-all hover:bg-accent bg-muted w-full h-[142px]"></div>
      </div>
    </section>
  );
}

export default function InboxLayout({
  email,
  inbox,
}: Readonly<{
  email: React.ReactNode;
  inbox: React.ReactNode;
}>) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <ResizablePanelGroup direction="horizontal" className="flex flex-row">
      <ResizablePanel
        minSize={10}
        defaultSize={20}
        maxSize={20}
        collapsedSize={5}
        collapsible
        onCollapse={() => setSidebarCollapsed(true)}
        onExpand={() => setSidebarCollapsed(false)}
        className="md:block hidden"
      >
        <Sidebar collapsed={sidebarCollapsed} />
      </ResizablePanel>
      <ResizableHandle withHandle className="md:flex hidden" />
      <ResizablePanel minSize={26} defaultSize={30} maxSize={34}>
        <Suspense fallback={<InboxSkeleton />}> {inbox}</Suspense>
      </ResizablePanel>

      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <Suspense fallback={<EmailSkeleton />}>{email}</Suspense>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
