import { useQuery } from "@tanstack/react-query";
import { getMetadata } from "@/services/meta.service";

export const useGetMetadata = () => {
  return useQuery({
    queryKey: ["metadata"],
    queryFn: getMetadata,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
