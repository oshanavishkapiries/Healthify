import { AlertCircle } from "lucide-react";

const ErrorBlogFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="w-8 h-8 mb-4 text-muted-foreground" />
      <h3 className="font-medium text-muted-foreground mb-2">
        Error loading blogs
      </h3>
      <p className="text-muted-foreground text-sm max-w-md">
        Please try again later.
      </p>
    </div>
  );
};

export default ErrorBlogFound;
