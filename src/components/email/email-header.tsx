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

export default function EmailHeader() {
  return (
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
  );
}
