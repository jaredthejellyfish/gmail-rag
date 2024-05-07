'use client';

import React, { Suspense, useState } from 'react';

import Sidebar from '@c/sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@c/ui/resizable';

import { Separator } from '@/components/ui/separator';

function DraftsScheleton() {
  return (
    <section className="bg-black flex flex-col max-h-screen pb-5 h-screen">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Drafts</h1>
        <span className="h-9"></span>
      </div>
      <Separator />
      <div className="px-3 flex flex-col gap-2 overflow-y-scroll max-h-full py-2"></div>
    </section>
  );
}

export default function InboxLayout({
  email,
  drafts,
}: Readonly<{
  email: React.ReactNode;
  drafts: React.ReactNode;
}>) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <ResizablePanelGroup direction="horizontal" className="flex flex-row">
      <ResizablePanel
        minSize={10}
        defaultSize={18}
        maxSize={18}
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
        <Suspense fallback={<DraftsScheleton />}>{drafts}</Suspense>
      </ResizablePanel>

      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={41}>
        <Suspense fallback={<span>Suspended</span>}>{email}</Suspense>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
