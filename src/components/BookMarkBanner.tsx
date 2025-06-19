import { Bookmark } from "lucide-react";

export default function BookMarkBanner() {
  return (
    <div className="bg-muted text-foreground px-4 py-3 rounded-lg">
      <div className="flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <div
            className="bg-primary/15 flex size-9 shrink-0 items-center justify-center rounded-full max-md:mt-0.5"
            aria-hidden="true"
          >
            <Bookmark className="opacity-80" size={16} />
          </div>
          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Your Bookmarked Posts</p>
              <p className="text-muted-foreground text-sm">
                View and manage all the blog posts you've saved for later.
                Easily revisit your favorite reads!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
