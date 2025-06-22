import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/common/optimized-image";
import type { BlogPost } from "@/types/Blog";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { pastTime } from "@/utils/pastTime";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow duration-200 relative"
      onClick={() => navigate(`/blog/${post._id}`)}
    >
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <button
            className="absolute top-3 right-3 p-2 bg-background/80 rounded-full hover:bg-background/90 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Bookmark clicked for post:", post._id);
            }}
          >
            <Bookmark className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-card-foreground">
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
          {post.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground/70">
            {pastTime(post.date)}
          </p>
          <Badge variant="secondary">{post.categoryId.category}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
