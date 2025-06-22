import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useGetUserProfile } from "@/hooks/query/useUser";
import Cookies from "js-cookie";

const UserProfileInitializer = () => {
  const { user, setLoading } = useUserStore();
  const authToken = Cookies.get("authToken");
  const { refetch } = useGetUserProfile();

  useEffect(() => {
    if (authToken && !user) {
      setLoading(true);
      refetch();
    }
  }, [authToken, user, refetch, setLoading]);

  return null;
};

export default UserProfileInitializer;
