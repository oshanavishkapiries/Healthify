import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "@/services/blog.service";
import type { UpdateBlogData, GetBlogsParams } from "@/types/blog-api-type";
import { toast } from "sonner";

export const useGetBlogs = (params: Omit<GetBlogsParams, "page" | "limit">) => {
  return useInfiniteQuery({
    queryKey: ["blogs", params],
    queryFn: ({ pageParam = 1 }) =>
      getBlogs({ ...params, page: pageParam, limit: 8 }),
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = lastPage.data.totalPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      blogId,
      blogData,
    }: {
      blogId: string;
      blogData: UpdateBlogData;
    }) => updateBlog(blogId, blogData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};
