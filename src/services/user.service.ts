import type { UpdateProfileData } from "@/types/auth-api-type";
import axiosClient from "./axios.client";

export const updateUserProfile = async (profileData: UpdateProfileData) => {
  const response = await axiosClient.put(
    "/api/user/update-profile",
    profileData
  );
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axiosClient.get("/api/auth/me");
  return response.data;
};
