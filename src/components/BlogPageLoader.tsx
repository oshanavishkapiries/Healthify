import { BlogCardSkeleton } from "./skeleton/BlogCardSkeleton";

const BlogPageLoader = () => {
  const skeletonArray = Array.from({ length: 12 }, (_, index) => index);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {skeletonArray.map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default BlogPageLoader;
