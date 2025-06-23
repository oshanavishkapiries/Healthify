import { AlertCircle, Link } from "lucide-react";
import { Button } from "./ui/button";

const ErrorBlogNotFound = ({ error }: { error: any }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="w-8 h-8 mb-4 text-muted-foreground" />
      <h3 className="font-medium text-muted-foreground mb-2">
        Blog Post Not Found
      </h3>
      <p className="text-muted-foreground text-sm max-w-md">
        {error?.response?.data?.message ||
          "The blog post you're looking for doesn't exist."}
      </p>
      <Button asChild variant="ghost">
        <Link to="/blog">Back to Blogs</Link>
      </Button>
    </div>
  );
};

export default ErrorBlogNotFound;
