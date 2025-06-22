import BmiCalculator from "@/components/BmiCalculator";
import CompleteAccountBanner from "@/components/CompleteAccountBanner";
import EmailVerifyBanner from "@/components/EmailVerifyBanner";
import { HomeBlogCard } from "@/components/HomeBlogCard";
import { useGetBlogs } from "@/hooks/query/useBlog";
import { useUserStore } from "@/store/userStore";
import BlogPageLoader from "@/components/BlogPageLoader";
import type { BlogPost } from "@/types/Blog";
import ErrorBlogFound from "@/components/ErrorBlogFound";
import NoBlogFound from "@/components/NoBlogFound";

const Home = () => {
  const { user } = useUserStore();
  const { data, isLoading, error } = useGetBlogs({});

  const blogs: BlogPost[] = data?.pages[0]?.data?.blogs.slice(0, 5) || [];

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-4">
        {user && !user?.isProfileCompleted && <CompleteAccountBanner />}
        {!user?.isEmailVerified && user?.isProfileCompleted && (
          <EmailVerifyBanner />
        )}

        <BmiCalculator />

        {isLoading ? (
          <BlogPageLoader />
        ) : error ? (
          <ErrorBlogFound />
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-full">
              {blogs[0] && <HomeBlogCard post={blogs[0]} isPrimary={true} />}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {blogs.slice(1, 5).map((post) => (
                <HomeBlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        ) : (
          <NoBlogFound />
        )}
      </main>
    </div>
  );
};

export default Home;
