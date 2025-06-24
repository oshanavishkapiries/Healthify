import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types/Blog";
import { Link } from "react-router-dom";
import { OptimizedImage } from "./common/optimized-image";
import { pastTime } from "@/utils/pastTime";

interface HomeBlogCardProps {
  post: BlogPost;
}

export const HomeBlogCard = ({ post }: HomeBlogCardProps) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/blog/${post._id}`} className="block">
        <div className="relative overflow-hidden aspect-video flex-shrink-0">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold mb-2 line-clamp-2 text-lg">
          <Link to={`/blog/${post._id}`}>{post.title}</Link>
        </h3>
        <p className="text-sm mb-4 flex-grow text-muted-foreground line-clamp-3">
          {post.description}
        </p>
        <div className="flex justify-between items-center text-xs mt-auto text-muted-foreground">
          <span>{pastTime(post.date)}</span>
          <Badge variant="outline">{post?.categoryId?.category}</Badge>
        </div>
      </div>
    </div>
  );
};
