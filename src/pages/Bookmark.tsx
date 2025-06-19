import { BlogCard } from "@/components/BlogCard";
import { sampleBlogPosts } from "@/dump/types";
import { SearchDropdown } from "@/components/common/search-dropdown";
import BookMarkBanner from "@/components/BookMarkBanner";

const searchOptions = [
  { label: "All", value: "all" },
  { label: "Category 1", value: "category1" },
  { label: "Category 2", value: "category2" },
];

const Bookmark = () => {
  const handleSelect = (option: { label: string; value: string }) => {
    // You can implement navigation or filtering here
    // For now, just log the selected option
    console.log("Selected:", option);
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <BookMarkBanner />
        {/* search component */}
        <div className="flex items-center justify-center gap-3 mb-4 h-[80px]">
          <SearchDropdown options={searchOptions} onSelect={handleSelect} />
        </div>
        {/* card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleBlogPosts.slice(0, 4).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Bookmark;
