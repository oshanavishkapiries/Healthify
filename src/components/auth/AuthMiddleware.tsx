import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useGetUserProfile } from "@/hooks/query/useUser";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");
  const { user, isLoading } = useUserStore();
  const { refetch } = useGetUserProfile();

  useEffect(() => {
    if (!authToken) {
      navigate("/auth/login");
    } else if (!user && !isLoading) {
      refetch();
    }
  }, [authToken, user, isLoading, navigate, refetch]);

  if (!authToken || (!user && isLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthMiddleware;
