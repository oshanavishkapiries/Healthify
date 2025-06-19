import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/common/optimized-image";
import type { BlogPost } from "@/types/Blog";
import { useNavigate } from "react-router-dom";

interface HomeBlogCardProps {
  post: BlogPost;
}

export const HomeBlogCard = ({ post }: HomeBlogCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-shadow duration-200 border-2 border-primary/20 relative cursor-pointer group"
      onClick={() => navigate(`/blog/${post.id}`)}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <OptimizedImage
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 z-10" variant="secondary">
          {post.category}
        </Badge>
      </div>
      <CardContent className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-primary line-clamp-2 mb-1">
          {post.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
          {post.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-muted-foreground/70 font-mono">
            {post.date}
          </span>
          {/* Optionally, add a small icon or action here */}
        </div>
      </CardContent>
    </Card>
  );
};
