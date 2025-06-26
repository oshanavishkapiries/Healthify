import { BlogCard } from "@/components/BlogCard";
import BookMarkBanner from "@/components/BookMarkBanner";
import { SearchInput } from "@/components/common/SearchInput";
import { useUserStore } from "@/store/userStore";
import GotoSignIn from "@/components/GotoSignIn";
import { useGetBookmarks } from "@/hooks/query/useBookmark";
import BlogPageLoader from "@/components/BlogPageLoader";
import ErrorBlogFound from "@/components/ErrorBlogFound";
import NoBlogFound from "@/components/NoBlogFound";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const Bookmark = () => {
  const { user } = useUserStore();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGetBookmarks({
    search: searchQuery,
  });

  if (!user) {
    return <GotoSignIn />;
  }

  const allBookmarks =
    data?.pages.flatMap((page) => {
      if (page.data.blogs) {
        return page.data.blogs;
      }
      return [];
    }) ?? [];


  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <BookMarkBanner />
        {/* search component */}
        <div className="flex items-center justify-center gap-3 mb-4 h-[80px]">
          <SearchInput />
        </div>
        {/* card grid */}
        {isLoading ? (
          <BlogPageLoader />
        ) : error ? (
          <ErrorBlogFound />
        ) : allBookmarks.length === 0 ? (
          <NoBlogFound />
        ) : (
          <InfiniteScroll
            dataLength={allBookmarks.length}
            next={fetchNextPage}
            hasMore={hasNextPage || false}
            loader={<></>}
            scrollThreshold={0.9}
            scrollableTarget="scrollableDiv"
          >
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allBookmarks.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (index % 8) * 0.1, duration: 0.4 }}
                >
                  <BlogCard post={post} />
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

export default Bookmark;
