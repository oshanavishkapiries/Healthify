export default function BlogViewSkeleton() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
        <article className="space-y-8">
          {/* Skeleton Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted" />
  
          {/* Skeleton Header */}
          <header className="space-y-4">
            <div className="h-10 w-3/4 bg-muted rounded" />
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="h-6 w-24 bg-muted rounded-full" />
              <div className="h-5 w-20 bg-muted rounded" />
              <div className="h-5 w-20 bg-muted rounded" />
            </div>
          </header>
  
          {/* Skeleton Description */}
          <div className="border-l-4 border-primary/20 pl-6 space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-4/6 bg-muted rounded" />
          </div>
  
          {/* Skeleton Content */}
          <div className="space-y-4">
            <div className="h-6 w-1/2 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
            <div className="h-6 w-1/3 bg-muted rounded mt-8" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-4/5 bg-muted rounded" />
          </div>
        </article>
      </div>
    );
  }
  