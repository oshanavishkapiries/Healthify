import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types/Blog";
import { Link } from "react-router-dom";
import { OptimizedImage } from "./common/optimized-image";
import { pastTime } from "@/utils/pastTime";
import BlogOptionButton from "./BlogOptionButton";
import { useAdmin } from "@/hooks/useAdmin";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const { isAdmin } = useAdmin();

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
              variant="secondary"
              className="rounded-full shadow-none"
              aria-label="Bookmark"
            >
              <Bookmark size={16} />
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
