import { useGetMetadata } from "@/hooks/query/useMetaData";

const MetaDataInitializer = () => {
  useGetMetadata();
  return null;
};

export default MetaDataInitializer;
