import { Footer } from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import StaticBackground from "@/components/common/StaticBackground";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <StaticBackground />

      <Navbar />
      <main className="flex-1">
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
