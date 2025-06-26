import { Skeleton } from "@/components/ui/skeleton";

export const BlogCardSkeleton = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full animate-pulse">
      {/* Image Placeholder */}
      <div className="relative overflow-hidden rounded-t-lg h-48 w-full bg-muted" />

      {/* Content Placeholder */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* Title Skeleton */}
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />

        <div className="flex justify-between items-center pt-4">
          {/* Time */}
          <Skeleton className="h-3 w-1/4 rounded" />
          {/* Category Badge */}
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
};
