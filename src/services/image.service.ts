import axiosClient from "./axios.client";
import type { ImageUploadResponse } from "@/types/image-api-type";

export const uploadImage = async (file: File): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosClient.post("/api/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
