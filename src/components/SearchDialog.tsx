import * as React from "react";
import { ArrowUpRightIcon, BookOpenIcon, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useSearchBlogsSimple } from "@/hooks/query/useBlog";

interface SearchBlogResult {
  _id: string;
  title: string;
}

export default function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Debounce search query
  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query]);

  // Search blogs using the API
  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchBlogsSimple({
    search: debouncedQuery,
    limit: 10,
  });

  // Get search results
  const blogs = React.useMemo(() => {
    return searchResults?.data || ([] as SearchBlogResult[]);
  }, [searchResults]);

  const handleBlogSelect = (blogId: string) => {
    setOpen(false);
    navigate(`/blog/${blogId}`);
  };

  const handleViewAllResults = () => {
    setOpen(false);
    navigate(`/blog?search=${encodeURIComponent(debouncedQuery)}`);
  };

  return (
    <>
      <button
        className="hidden min-lg:inline-flex w-full bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-full px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <SearchIcon
            className="text-muted-foreground/80 -ms-1 me-3"
            size={16}
            aria-hidden="true"
          />
          <span className="text-muted-foreground/70 font-normal">
            Search blogs...
          </span>
        </span>
      </button>
      {/* mobile */}
      <button
        className="min-lg:hidden bg-muted rounded-full aspect-square flex items-center justify-center w-8 h-8"
        onClick={() => setOpen(true)}
      >
        <SearchIcon
          className="text-muted-foreground"
          size={16}
          aria-hidden="true"
        />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search blogs..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {isLoading && debouncedQuery && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          )}

          {error && (
            <div className="py-6 text-center text-sm text-red-500">
              Error searching blogs. Please try again.
            </div>
          )}

          {!isLoading && debouncedQuery && blogs.length === 0 && (
            <CommandEmpty>No blogs found for "{debouncedQuery}".</CommandEmpty>
          )}

          {!debouncedQuery && (
            <CommandEmpty>Start typing to search blogs...</CommandEmpty>
          )}

          {blogs.length > 0 && (
            <>
              <CommandGroup heading="Blog Results">
                {blogs.slice(0, 5).map((blog: SearchBlogResult) => (
                  <CommandItem
                    key={blog._id}
                    onSelect={() => handleBlogSelect(blog._id)}
                    className="cursor-pointer"
                  >
                    <BookOpenIcon
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{blog.title}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>

              {blogs.length > 5 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={handleViewAllResults}
                      className="cursor-pointer"
                    >
                      <ArrowUpRightIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                      />
                      <span>View all {blogs.length} results</span>
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
