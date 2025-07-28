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
import ImageSider from "@/components/common/ImageSider";
import BmiCalculatorV2 from "@/components/BmiCalculatorV2";

const Home = () => {
  const { user } = useUserStore();
  const { data, isLoading, error } = useGetBlogs({});

  const blogs: BlogPost[] = data?.pages[0]?.data?.blogs.slice(0, 4) || [];

  // Sample health-related images for the slider
  const healthImages = [
    {
      src: "https://i.ibb.co/DDt5bSJC/Frame-2085666416.png",
      alt: "Health Confidence",
    },
    {
      src: "https://i.ibb.co/FLVr4GNL/Frame-2085666418.png",
      alt: "Healthy Lifestyle",
    },
  ];

  console.log(blogs);

  return (
    <div className="min-h-screen">
      {user && !user?.isProfileCompleted && <CompleteAccountBanner />}
      {!user?.isEmailVerified && user?.isProfileCompleted && (
        <EmailVerifyBanner />
      )}
      <div className="w-full">
        <ImageSider images={healthImages} autoPlay={true} interval={4000} />
      </div>
      <BmiCalculatorV2 />
      <main className="max-w-7xl mx-auto px-4 pb-4">
        {/* <BmiCalculator /> */}
        {isLoading ? (
          <BlogPageLoader />
        ) : error ? (
          <ErrorBlogFound />
        ) : blogs.length >= 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
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
