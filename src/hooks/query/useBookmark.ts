import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  getBookmarks,
  setBookmark,
  removeBookmark,
} from "@/services/bookmark.service";
import { toast } from "sonner";
import { useMemo } from "react";
import { useIsAuthenticated } from "@/lib/auth";

export const useGetBookmarks = (params?: object) => {
  const isAuthenticated = useIsAuthenticated();

  return useInfiniteQuery({
    queryKey: ["bookmarks", params],
    queryFn: ({ pageParam = 1 }) =>
      getBookmarks({ ...(params || {}), page: pageParam, limit: 8 }),
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages?.length;
      const totalPages = lastPage?.data?.totalPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: isAuthenticated,
  });
};

export const useSetBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useIsBookmarked = (blogId: string) => {
  const { data } = useGetBookmarks();
  const bookmarkInfo = useMemo(() => {
    const allBookmarks = data?.pages.flatMap((page) => page.data.blogs) ?? [];
    return allBookmarks.find((b: any) => b?._id === blogId);
  }, [data, blogId]);
  return { isBookmarked: !!bookmarkInfo, bookmarkInfo };
};
