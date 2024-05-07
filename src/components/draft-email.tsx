function Draft({
  date,
  subject,
  body,
}: {
  id: string;
  date: string;
  subject: string;
  body: string;
}) {
  return (
    <button className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted w-full">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">Draft</div>
          </div>
          <div className="ml-auto text-xs text-foreground lg:block hidden">
            {date}
          </div>
        </div>
        <div className="text-xs font-medium">
          {!!subject ? subject : '(no subject)'}
        </div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {body}...
      </div>
    </button>
  );
}

export default Draft;
