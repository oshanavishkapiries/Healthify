import { useParams } from "react-router-dom";
import BlogViewPage from "@/components/BlogViewPage";
import { useGetBlogById } from "@/hooks/query/useBlog";
import BlogViewSkeleton from "@/components/skeleton/BlogViewSkeleton";
import ErrorBlogNotFound from "@/components/ErrorBlogNotFound";

const BlogView = () => {
  const { id } = useParams();

  const {
    data: blogResponse,
    isLoading,
    isError,
    error,
  } = useGetBlogById(id || "");

  if (isLoading) {
    return <BlogViewSkeleton />;
  }

  if (isError || !blogResponse?.data) {
    return <ErrorBlogNotFound error={error} />;
  }

  return (
    <div className="min-h-screen">
      <BlogViewPage blogPost={blogResponse.data} />
    </div>
  );
};

export default BlogView;
