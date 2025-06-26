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

  const blogs: BlogPost[] = data?.pages[0]?.data?.blogs.slice(0, 4) || [];

  console.log(blogs);

  return (
    <div className="min-h-screen">
      {user && !user?.isProfileCompleted && <CompleteAccountBanner />}
      {!user?.isEmailVerified && user?.isProfileCompleted && (
        <EmailVerifyBanner />
      )}
      <div className="w-full mb-4">
        <img
          src={"https://i.ibb.co/kV395LHC/image.jpg"}
          alt={"healthimage"}
          className="w-full h-96 object-cover"
        />
      </div>
      <main className="max-w-7xl mx-auto px-4 pb-4">
        <BmiCalculator />

        {isLoading ? (
          <BlogPageLoader />
        ) : error ? (
          <ErrorBlogFound />
        ) : blogs.length >= 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {blogs.map((post) => (
              <HomeBlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <NoBlogFound />
        )}
      </main>
    </div>
  );
};

export default Home;
