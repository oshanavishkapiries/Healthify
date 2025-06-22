import BmiCalculator from "@/components/BmiCalculator";
import CompleteAccountBanner from "@/components/CompleteAccountBanner";
import EmailVerifyBanner from "@/components/EmailVerifyBanner";
import { HomeBlogCard } from "@/components/HomeBlogCard";
import { sampleBlogPosts } from "@/dump/types";
import { useUserStore } from "@/store/userStore";

const Home = () => {
  const { user } = useUserStore();
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-4">
        {user && !user?.isProfileCompleted && <CompleteAccountBanner />}
        {!user?.isEmailVerified && user?.isProfileCompleted && (
          <EmailVerifyBanner />
        )}

        {/* BMI Calculator */}
        <BmiCalculator />
        {/* card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleBlogPosts.slice(0, 4).map((post) => (
            <HomeBlogCard key={post._id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
