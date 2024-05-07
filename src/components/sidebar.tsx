'use client';

import { Separator } from '@/components/ui/separator';
import {
  Archive,
  ArchiveX,
  ChevronsUpDown,
  CircleAlert,
  File,
  HelpCircleIcon,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <div className="bg-black h-screen">
      <div className="flex h-[52px] items-center justify-center px-2">
        <button
          type="button"
          role="combobox"
          aria-controls="radix-:r38:"
          aria-expanded="false"
          aria-autocomplete="none"
          dir="ltr"
          data-collapsed={collapsed}
          className="h-9 w-full justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2 [&amp;>span]:line-clamp-1 [&amp;>span]:flex [&amp;>span]:w-full [&amp;>span]:items-center [&amp;>span]:gap-1 [&amp;>span]:truncate [&amp;_svg]:h-4 [&amp;_svg]:w-4 [&amp;_svg]:shrink-0 group data-[collapsed=true]:justify-center data-[collapsed=true]:p-0"
          aria-label="Select account"
        >
          <span className="pointer-events-none flex flex-row items-center justify-between group-data-[collapsed=true]:justify-center">
            <HelpCircleIcon />
            <span className="ml-2 group-data-[collapsed=true]:hidden">
              Gerard Hernandez
            </span>
          </span>
          <ChevronsUpDown
            size={15}
            className="h-4 w-4 opacity-50 group-data-[collapsed=true]:hidden"
            aria-hidden
          />
        </button>
      </div>
      <Separator />
      <div
        data-collapsed={collapsed}
        className="group flex flex-col gap-4 py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:p-0">
          <Link
            className={cn(
              'flex flex-row items-center justify-start px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 rounded-md group-data-[collapsed=true]:p-0 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:w-9',
              pathname === '/inbox' && 'bg-accent text-accent-foreground',
            )}
            href="/inbox"
          >
            <Inbox
              size={24}
              className="mr-2 h-4 w-4 group-data-[collapsed=true]:m-0"
            />
            <span className="group-data-[collapsed=true]:hidden">Inbox</span>
            <span className="group-data-[collapsed=true]:hidden ml-auto text-background dark:text-white">
              128
            </span>
          </Link>
          <Link
            className={cn(
              'flex flex-row items-center justify-start px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 rounded-md group-data-[collapsed=true]:p-0 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:w-9',
              pathname === '/drafts' && 'bg-accent text-accent-foreground',
            )}
            href="/drafts"
          >
            <File
              size={24}
              className="mr-2 h-4 w-4 group-data-[collapsed=true]:m-0"
            />
            <span className="group-data-[collapsed=true]:hidden">Drafts</span>
            <span className="group-data-[collapsed=true]:hidden ml-auto text-background dark:text-white">
              9
            </span>
          </Link>
          <Link
            className={cn(
              'flex flex-row items-center justify-start px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 rounded-md group-data-[collapsed=true]:p-0 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:w-9',
              pathname === '/sent' && 'bg-accent text-accent-foreground',
            )}
            href="/sent"
          >
            <Send
              size={24}
              className="mr-2 h-4 w-4 group-data-[collapsed=true]:m-0"
            />
            <span className="group-data-[collapsed=true]:hidden">Sent</span>
          </Link>
          <Link
            className="flex flex-row items-center justify-start px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 rounded-md group-data-[collapsed=true]:p-0 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:w-9"
            href="#"
          >
            <ArchiveX
              size={24}
              className="mr-2 h-4 w-4 group-data-[collapsed=true]:m-0"
            />
            <span className="group-data-[collapsed=true]:hidden">Junk</span>
            <span className="group-data-[collapsed=true]:hidden ml-auto text-background dark:text-white">
              23
            </span>
          </Link>
          <Link
            className="flex flex-row items-center justify-start px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 rounded-md group-data-[collapsed=true]:p-0 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:w-9"
            href="#"
          >
            <Trash2
              size={24}
              className="mr-2 h-4 w-4 group-data-[collapsed=true]:m-0"
            />
            <span className="group-data-[collapsed=true]:hidden">Trash</span>
          </Link>
          <Link
            className="flex flex-row items-center justify-start px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 rounded-md group-data-[collapsed=true]:p-0 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:w-9"
            href="#"
          >
            <Archive
              size={24}
              className="mr-2 h-4 w-4 group-data-[collapsed=true]:m-0"
            />
            <span className="group-data-[collapsed=true]:hidden">Archive</span>
          </Link>
        </nav>
      </div>
      <Separator orientation="horizontal" />
      <div
        data-collapsed={collapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:p-0">
          <Link
            className="flex flex-row items-center justify-start px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 rounded-md group-data-[collapsed=true]:p-0 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:w-9"
            href="#"
          >
            <Users
              size={24}
              className="mr-2 h-4 w-4 group-data-[collapsed=true]:m-0"
            />
            <span className="group-data-[collapsed=true]:hidden">Social</span>
            <span className="group-data-[collapsed=true]:hidden ml-auto text-background dark:text-white">
              23
            </span>
          </Link>
          <Link
            className="flex flex-row items-center justify-start px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 rounded-md group-data-[collapsed=true]:p-0 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:w-9"
            href="#"
          >
            <CircleAlert
              size={24}
              className="mr-2 h-4 w-4 group-data-[collapsed=true]:m-0"
            />
            <span className="group-data-[collapsed=true]:hidden">Updates</span>
            <span className="group-data-[collapsed=true]:hidden ml-auto text-background dark:text-white">
              10
            </span>
          </Link>
          <Link
            className="flex flex-row items-center justify-start px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 rounded-md group-data-[collapsed=true]:p-0 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:w-9"
            href="#"
          >
            <MessagesSquare
              size={24}
              className="mr-2 h-4 w-4 group-data-[collapsed=true]:m-0"
            />
            <span className="group-data-[collapsed=true]:hidden">Forum</span>
            <span className="group-data-[collapsed=true]:hidden ml-auto text-background dark:text-white">
              92
            </span>
          </Link>
          <Link
            className="flex flex-row items-center justify-start px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 rounded-md group-data-[collapsed=true]:p-0 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:w-9"
            href="#"
          >
            <ShoppingCart
              size={24}
              className="mr-2 h-4 w-4 group-data-[collapsed=true]:m-0"
            />
            <span className="group-data-[collapsed=true]:hidden">Shopping</span>
            <span className="group-data-[collapsed=true]:hidden ml-auto text-background dark:text-white">
              11
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
