import { BlogCard } from "@/components/BlogCard";
import { sampleBlogPosts } from "@/dump/sampleBlogPosts";
import BookMarkBanner from "@/components/BookMarkBanner";
import { SearchInput } from "@/components/common/SearchInput";
import { useUserStore } from "@/store/userStore";
import GotoSignIn from "@/components/GotoSignIn";

const Bookmark = () => {
  const { user } = useUserStore();

  if (!user) {
    return <GotoSignIn />;
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <BookMarkBanner />
        {/* search component */}
        <div className="flex items-center justify-center gap-3 mb-4 h-[80px]">
          <SearchInput />
        </div>
        {/* card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleBlogPosts.slice(0, 4).map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Bookmark;
