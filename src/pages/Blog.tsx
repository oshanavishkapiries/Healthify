import { BlogCard } from "@/components/BlogCard";
import { SearchDropdown } from "@/components/common/search-dropdown";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CategoryFilter } from "@/components/common/category-filter";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import EmailVerifyBanner from "@/components/EmailVerifyBanner";
import CompleteAccountBanner from "@/components/CompleteAccountBanner";
import NoBlogFound from "@/components/NoBlogFound";
import { useGetBlogs } from "@/hooks/query/useBlog";
import type { BlogPost } from "@/types/Blog";
import BlogPageLoader from "@/components/BlogPageLoader";
import ErrorBlogFound from "@/components/ErrorBlogFound";
import { useGetMetadata } from "@/hooks/query/useMetaData";
import type { BlogCategory } from "@/types/meta-api-type";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user } = useUserStore();
  const { data: metaData } = useGetMetadata();

  const categories =
    metaData?.data?.blogCategories?.map((category: BlogCategory) => ({
      label: category.category,
      value: category._id,
    })) || [];

  const {
    data: blogsData,
    isLoading,
    error,
  } = useGetBlogs({
    page: 1,
    limit: 20,
    blogCategoryId:
      selectedCategory !== "All"
        ? categories.find(
            (cat: { value: string }) => cat.value === selectedCategory
          )?.value
        : undefined,
  });

  const blogs: BlogPost[] = blogsData?.data?.blogs || [];

  const searchOptions = blogs.map((blog: BlogPost) => ({
    label: blog.title,
    value: String(blog._id),
  }));

  const handleSelect = (option: { label: string; value: string }) => {
    console.log("Selected:", option);
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-4">
        {user && !user?.isProfileCompleted && <CompleteAccountBanner />}
        {!user?.isEmailVerified && user?.isProfileCompleted && (
          <EmailVerifyBanner />
        )}
        <div className="flex items-center justify-center gap-3 mb-4 h-[80px]">
          <SearchDropdown options={searchOptions} onSelect={handleSelect} />
          {user?.roleId?.role === "ADMIN" && (
            <Link to="/blog/create">
              <Button className="rounded-lg aspect-square md:w-[150px] py-5">
                <PlusIcon
                  className="opacity-60 sm:-ms-1"
                  size={16}
                  aria-hidden="true"
                />
                <span className="hidden md:block text-sm">New Post</span>
              </Button>
            </Link>
          )}
        </div>
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        {isLoading ? (
          <BlogPageLoader />
        ) : error ? (
          <ErrorBlogFound />
        ) : blogs.length === 0 ? (
          <NoBlogFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs.map((blog: BlogPost) => (
              <BlogCard key={blog._id} post={blog} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Blog;
