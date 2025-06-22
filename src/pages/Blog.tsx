import { BlogCard } from "@/components/BlogCard";
import { SearchDropdown } from "@/components/common/search-dropdown";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CategoryFilter } from "@/components/common/category-filter";
import { useEffect, useState } from "react";
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
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
  const [hasMore, setHasMore] = useState(true);

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
    page,
    limit: 8,
    blogCategoryId:
      selectedCategory !== "All"
        ? categories.find(
            (cat: { value: string }) => cat.value === selectedCategory
          )?.value
        : undefined,
  });

  useEffect(() => {
    if (blogsData?.data) {
      if (blogsData.data.blogs?.length > 0) {
        setAllBlogs((prev) => [...prev, ...blogsData.data.blogs]);
      }
      setHasMore(page < (blogsData.data.totalPages || 0));
    }
  }, [blogsData, page]);

  const handleCategorySelect = (category: string) => {
    if (category !== selectedCategory) {
      setPage(1);
      setAllBlogs([]);
      setHasMore(true);
      setSelectedCategory(category);
    }
  };

  const searchOptions = allBlogs.map((blog: BlogPost) => ({
    label: blog.title,
    value: String(blog._id),
  }));

  const handleSelect = (option: { label: string; value: string }) => {
    console.log("Selected:", option);
  };

  const fetchNext = () => {
    setPage((prev) => prev + 1);
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
          onSelect={handleCategorySelect}
        />

        {isLoading && page === 1 ? (
          <BlogPageLoader />
        ) : error ? (
          <ErrorBlogFound />
        ) : allBlogs.length === 0 ? (
          <NoBlogFound />
        ) : (
          <InfiniteScroll
            dataLength={allBlogs.length}
            next={fetchNext}
            hasMore={hasMore}
            loader={<></>}
            scrollThreshold={0.9}
            scrollableTarget="scrollableDiv"
          >
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (index % 8) * 0.1, duration: 0.4 }}
                >
                  <BlogCard post={blog} />
                </motion.div>
              ))}
            </motion.div>
          </InfiniteScroll>
        )}
        {isLoading && page > 1 && <BlogPageLoader />}
      </main>
    </div>
  );
};

export default Blog;
