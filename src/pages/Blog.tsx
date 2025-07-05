import { BlogCard } from "@/components/BlogCard";
import { CategoryFilter } from "@/components/common/category-filter";
import { useSearchParams } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import EmailVerifyBanner from "@/components/EmailVerifyBanner";
import CompleteAccountBanner from "@/components/CompleteAccountBanner";
import NoBlogFound from "@/components/NoBlogFound";
import { useGetBlogs } from "@/hooks/query/useBlog";
import BlogPageLoader from "@/components/BlogPageLoader";
import ErrorBlogFound from "@/components/ErrorBlogFound";
import { useGetBlogCategories } from "@/hooks/query/useMetaData";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
//import { SearchInput } from "@/components/common/SearchInput";

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const selectedBmi = searchParams.get("bmi") || "";
  const selectedCategory = searchParams.get("category") || "All";

  const { user } = useUserStore();
  const { categories } = useGetBlogCategories();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGetBlogs({
    categoryId:
      selectedCategory !== "All"
        ? categories.find(
            (cat: { value: string }) => cat.value === selectedCategory
          )?.value
        : undefined,
    search: searchQuery,
    bmi: selectedBmi,
  });

  const allBlogs =
    data?.pages.flatMap((page) => {
      if (page.data.blogs) {
        return page.data.blogs;
      }
      return [];
    }) ?? [];

  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "All") {
      params.delete("category");
      params.delete("bmi");
    } else {
      params.set("category", category);
    }
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-4">
        {user && !user?.isProfileCompleted && <CompleteAccountBanner />}
        {!user?.isEmailVerified && user?.isProfileCompleted && (
          <EmailVerifyBanner />
        )}
        {/* <div className="flex items-center justify-center gap-3 mb-4 h-[80px]">
          <SearchInput />
        </div> */}

        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategorySelect}
        />

        {isLoading ? (
          <BlogPageLoader />
        ) : error ? (
          <ErrorBlogFound />
        ) : allBlogs.length === 0 ? (
          <NoBlogFound />
        ) : (
          <InfiniteScroll
            dataLength={allBlogs.length}
            next={fetchNextPage}
            hasMore={hasNextPage || false}
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
        {isFetchingNextPage && <BlogPageLoader />}
      </main>
    </div>
  );
};

export default Blog;
