import Cookies from "js-cookie";
import { useUserStore } from "@/store/userStore";

export const isAuthenticated = (): boolean => {
  const authToken = Cookies.get("authToken");
  const { isAuthenticated } = useUserStore.getState();
  return !!(authToken && isAuthenticated);
};

export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useUserStore();
  const authToken = Cookies.get("authToken");
  return !!(authToken && isAuthenticated);
};
