import type {
  CreateBlogData,
  GetBlogsParams,
  UpdateBlogData,
} from "@/types/blog-api-type";
import axiosClient from "./axios.client";

export const createBlog = async (blogData: CreateBlogData) => {
  const response = await axiosClient.post("/api/blog", blogData);
  return response.data;
};

export const getBlogs = async (params: GetBlogsParams) => {
  const response = await axiosClient.get("/api/blog", { params });
  return response.data;
};

export const updateBlog = async (blogId: string, blogData: UpdateBlogData) => {
  const response = await axiosClient.put(`/api/blog/${blogId}`, blogData);
  return response.data;
};

export const deleteBlog = async (blogId: string) => {
  const response = await axiosClient.delete(`/api/blog/${blogId}`);
  return response.data;
};

export const getBlogById = async (blogId: string) => {
  const response = await axiosClient.get(`/api/blog/${blogId}`);
  return response.data;
};