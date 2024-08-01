import { AxiosError } from "axios";
import { MutationOptions, useMutation } from "react-query";
import apiClient from "./client";
export const usePost = <
  TData = unknown,
  TVariables = unknown,
  TContext = unknown
>(
  url: string,
  options: Pick<
    MutationOptions<TData, AxiosError, TVariables, TContext>,
    "onSuccess" | "onError"
  > = {}
) => {
  const { mutate, isLoading, isError, error, data } = useMutation<
    TData,
    AxiosError,
    TVariables,
    TContext
  >(
    (data: TVariables) =>
      apiClient.post<TData>(url, data).then((res) => {
        console.log(res);
        return res.data;
      }),
    {
      onSuccess: options.onSuccess,
      onError: options.onError,
    }
  );

  return { mutate, isLoading, isError, error, data };
};
