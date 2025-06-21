import { BlogCard } from "@/components/BlogCard";
import { SearchDropdown } from "@/components/common/search-dropdown";
import { Button } from "@/components/ui/button";
import { sampleBlogPosts } from "@/dump/types";
import { PlusIcon } from "lucide-react";
import { CategoryFilter } from "@/components/common/category-filter";
import { useState } from "react";
import { Link } from "react-router-dom";

const categories = Array.from({ length: 10 }).map(
  (_, i) => `Category ${i + 1}`
);

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const searchOptions = sampleBlogPosts.map((post) => ({
    label: post.title,
    value: String(post.id),
  }));

  const handleSelect = (option: { label: string; value: string }) => {
    // You can implement navigation or filtering here
    // For now, just log the selected option
    console.log("Selected:", option);
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* search component */}
        <div className="flex items-center justify-center gap-3 mb-4 h-[80px]">
          <SearchDropdown options={searchOptions} onSelect={handleSelect} />
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
        </div>
        {/* categories */}
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        {/* card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleBlogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;
