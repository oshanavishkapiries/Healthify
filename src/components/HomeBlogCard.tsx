import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types/Blog";
import { Link } from "react-router-dom";
import { OptimizedImage } from "./common/optimized-image";
import { pastTime } from "@/utils/pastTime";
import { cn } from "@/lib/utils";

interface HomeBlogCardProps {
  post: BlogPost;
  isPrimary?: boolean;
}

export const HomeBlogCard = ({
  post,
  isPrimary = false,
}: HomeBlogCardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full overflow-hidden transition-shadow hover:shadow-lg",
        isPrimary && "relative text-white"
      )}
    >
      <Link
        to={`/blog/${post._id}`}
        className={cn("block", isPrimary && "absolute inset-0")}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            isPrimary ? "h-full" : "aspect-video flex-shrink-0"
          )}
        >
          {isPrimary ? (
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          ) : (
            <OptimizedImage
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          )}
          {isPrimary && (
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
          )}
        </div>
      </Link>
      <div
        className={cn(
          "p-4 flex flex-col flex-grow",
          isPrimary && "relative justify-end p-6"
        )}
      >
        <h3
          className={cn(
            "font-semibold mb-2 line-clamp-2",
            isPrimary ? "text-3xl font-bold line-clamp-3" : "text-lg"
          )}
        >
          <Link
            to={`/blog/${post._id}`}
            className={cn(isPrimary && "hover:underline")}
          >
            {post.title}
          </Link>
        </h3>
        <p
          className={cn(
            "text-sm mb-4 flex-grow",
            isPrimary
              ? "text-white/80 text-base line-clamp-4 mt-2"
              : "text-muted-foreground line-clamp-3"
          )}
        >
          {post.description}
        </p>
        <div
          className={cn(
            "flex justify-between items-center text-xs mt-auto",
            isPrimary ? "text-white/70" : "text-muted-foreground"
          )}
        >
          <span>{pastTime(post.date)}</span>
          <Badge variant={isPrimary ? "secondary" : "outline"}>
            {post?.categoryId?.category}
          </Badge>
        </div>
      </div>
    </div>
  );
};
