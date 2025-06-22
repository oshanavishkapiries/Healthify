import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "@/services/blog.service";
import type {
  UpdateBlogData,
  GetBlogsParams,
} from "@/types/blog-api-type";
import { toast } from "sonner";

export const useGetBlogs = (params: GetBlogsParams) => {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: () => getBlogs(params),
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
