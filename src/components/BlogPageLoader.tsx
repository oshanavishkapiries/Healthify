import { Loader2 } from "lucide-react";

const BlogPageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
    </div>
  );
};

export default BlogPageLoader;
