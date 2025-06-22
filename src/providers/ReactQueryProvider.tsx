import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/react-query/query-client";
import UserProfileInitializer from "@/components/auth/UserProfileInitializer";
import MetaDataInitializer from "@/components/MetaDataInitializer";

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProfileInitializer />
      <MetaDataInitializer />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
