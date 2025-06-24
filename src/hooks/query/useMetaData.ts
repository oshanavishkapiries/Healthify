import { useQuery } from "@tanstack/react-query";
import { getMetadata } from "@/services/meta.service";
import { useIsAuthenticated } from "@/lib/auth";

export const useGetMetadata = () => {
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ["metadata"],
    queryFn: getMetadata,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: isAuthenticated,
  });
};

export const useGetBlogCategories = () => {
  const { data: metaData } = useGetMetadata();

  const categories =
    metaData?.data?.blogCategories?.map((category: any) => ({
      label: category.category,
      value: category._id,
    })) || [];

  return { categories, isLoading: !metaData };
};
