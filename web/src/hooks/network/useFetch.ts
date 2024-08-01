import apiClient from "./client";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

const fetchData = async <T>({
  queryKey,
}: {
  queryKey: string[];
}): Promise<T> => {
  const [url] = queryKey;
  const response = await apiClient.get<T>(url);
  return response.data;
};

const useFetch = <T>(
  url: string,
  options?: Omit<UseQueryOptions<T, Error, T, [string]>, "queryKey" | "queryFn">
): UseQueryResult<T, Error> => {
  return useQuery<T, Error, T, [string]>([url], fetchData, {
    ...options,
  });
};

export default useFetch;
