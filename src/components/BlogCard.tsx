import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/common/optimized-image";
import type { BlogPost } from "@/types/BlogPost";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
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
          <p className="text-sm text-muted-foreground/70">{post.date}</p>
          <Badge variant="secondary">{post.category}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
