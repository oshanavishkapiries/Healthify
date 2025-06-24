import { updateUserProfile, getUserProfile } from "@/services/user.service";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { useIsAuthenticated } from "@/lib/auth";

export const useUpdateUserProfileAuth = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};

export const useGetUserProfile = () => {
  const { setUser, setLoading } = useUserStore();
  const isAuthenticated = useIsAuthenticated();

  const query = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data.data);
      setLoading(false);
    }
    if (query.error) {
      setUser(null);
      setLoading(false);
    }
  }, [query.data, query.error, setUser, setLoading]);

  return query;
};
