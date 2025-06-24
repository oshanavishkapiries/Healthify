import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types/Blog";
import { Link } from "react-router-dom";
import { OptimizedImage } from "./common/optimized-image";
import { pastTime } from "@/utils/pastTime";
import BlogOptionButton from "./BlogOptionButton";
import { useAdmin } from "@/hooks/useAdmin";
import { Bookmark, Bookmark as BookmarkFilled } from "lucide-react";
import { Button } from "./ui/button";
import {
  useSetBookmark,
  useRemoveBookmark,
  useIsBookmarked,
} from "@/hooks/query/useBookmark";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const { isAdmin } = useAdmin();
  const setBookmarkMutation = useSetBookmark();
  const removeBookmarkMutation = useRemoveBookmark();

  const { isBookmarked, bookmarkInfo } = useIsBookmarked(post._id);

  const bookmarkId = bookmarkInfo?._id;

  const handleBookmark = async () => {
    if (isBookmarked) {
      await removeBookmarkMutation.mutateAsync(bookmarkId);
    } else {
      await setBookmarkMutation.mutateAsync(post._id);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full">
      <div className="relative overflow-hidden rounded-t-lg">
        <Link to={`/blog/${post._id}`} className="block">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            className="h-48 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 right-2">
          {isAdmin ? (
            <BlogOptionButton blogId={post._id} />
          ) : (
            <Button
              size="icon"
              variant={isBookmarked ? "default" : "secondary"}
              className="rounded-full shadow-none"
              aria-label="Bookmark"
              onClick={handleBookmark}
              disabled={
                setBookmarkMutation.isPending ||
                removeBookmarkMutation.isPending
              }
            >
              {isBookmarked ? (
                <BookmarkFilled size={16} fill="currentColor" />
              ) : (
                <Bookmark size={16} />
              )}
            </Button>
          )}
        </div>
      </div>
      <Link to={`/blog/${post._id}`} className="block">
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-[56px]">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
            {post.description}
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{pastTime(post.date)}</span>
            <Badge variant="outline">{post?.categoryId?.category}</Badge>
          </div>
        </div>
      </Link>
    </div>
  );
};
