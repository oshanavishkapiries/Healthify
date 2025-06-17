import { BackButton } from "@/components/common/back-button";
import { Outlet } from "react-router-dom";
import AnimatedBackground from "@/components/common/AnimatedBackground";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute top-0 left-0 p-4 z-10">
        <BackButton />
      </div>
      <div className="z-10 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
