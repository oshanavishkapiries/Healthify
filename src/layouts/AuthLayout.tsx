import { BackButton } from "@/components/common/back-button";
import { Outlet } from "react-router-dom";
import AnimatedBackground from "@/components/common/AnimatedBackground";
import { Logo } from "@/components/common/logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute top-0 left-0 p-4 z-10">
        <BackButton />
      </div>
      <div className="z-10 w-full max-w-md flex flex-col items-center justify-center">
        <Logo width={60} height={60} />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
