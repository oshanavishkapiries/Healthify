import { useUserStore } from "@/store/userStore";

export const useAdmin = () => {
  const { user } = useUserStore();

  const isAdmin = user?.roleId?.role === "ADMIN";

  return {
    isAdmin,
    user,
  };
};
