import axiosClient from "./axios.client";

export const getBookmarks = async (params?: {
  page?: number;
  limit?: number;
}) => {
  const response = await axiosClient.get("/api/user/bookmarks", { params });
  return response.data;
};

export const setBookmark = async (blogId: string) => {
  const response = await axiosClient.post("/api/user/bookmarks", { blogId });
  return response.data;
};

export const removeBookmark = async (bookmarkId: string) => {
  const response = await axiosClient.delete(
    `/api/user/bookmarks/${bookmarkId}`
  );
  return response.data;
};
