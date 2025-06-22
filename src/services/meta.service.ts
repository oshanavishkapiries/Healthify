import axiosClient from "./axios.client";

export const getMetadata = async () => {
  const response = await axiosClient.get("/api/meta-data");
  return response.data;
};
