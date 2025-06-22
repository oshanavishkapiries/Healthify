import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types/Blog";
import { Link } from "react-router-dom";
import { OptimizedImage } from "./common/optimized-image";
import { pastTime } from "@/utils/pastTime";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full">
      <Link to={`/blog/${post._id}`} className="block">
        <div className="relative overflow-hidden rounded-t-lg">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            className="h-48 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-[56px]">
          <Link to={`/blog/${post._id}`}>{post.title}</Link>
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
          {post.description}
        </p>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{pastTime(post.date)}</span>
          <Badge variant="outline">{post?.categoryId?.category}</Badge>
        </div>
      </div>
    </div>
  );
};
