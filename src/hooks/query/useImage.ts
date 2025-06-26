import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/services/image.service";
import { toast } from "sonner";
import type { ImageUploadResponse } from "@/types/image-api-type";

export const useUploadImage = () => {
  return useMutation<ImageUploadResponse, Error, File>({
    mutationFn: uploadImage,
    onSuccess: (response) => {
      toast.success(response.message || "Image uploaded successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to upload image");
    },
  });
};
