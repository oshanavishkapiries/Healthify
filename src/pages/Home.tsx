// import BmiCalculator from "@/components/BmiCalculator";
import CompleteAccountBanner from "@/components/CompleteAccountBanner";
import EmailVerifyBanner from "@/components/EmailVerifyBanner";
import { HomeBlogCard } from "@/components/HomeBlogCard";
import { useGetBlogs } from "@/hooks/query/useBlog";
import { useUserStore } from "@/store/userStore";
import BlogPageLoader from "@/components/BlogPageLoader";
import type { BlogPost } from "@/types/Blog";
import ErrorBlogFound from "@/components/ErrorBlogFound";
import NoBlogFound from "@/components/NoBlogFound";
import BmiCalculatorMobile from "@/components/BmiCalculatorMobile__";

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
      <div className="w-full">
        <img
          src={"https://i.ibb.co/JWvmzBZ9/Are-You-Confident-About-Your-Health.png"}
          alt={"healthimage"}
          className="w-full h-[300px] md:h-[450px] lg:h-[500px] xl:h-[600px] object-cover"
        />
      </div>
      <BmiCalculatorMobile />
      <main className="max-w-7xl mx-auto px-4 pb-4">
        {/* <BmiCalculator /> */}

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
