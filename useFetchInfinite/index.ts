// NOTE: Complete use Fetch helper around useSWRInfinite fully typed to receive response formatter and typed query params

import { BareFetcher } from "swr";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

type UseFetchOptions<Data = unknown, Error = unknown> = Partial<
  SWRInfiniteConfiguration<Data, Error, BareFetcher<Data>>
>;

const setResponse = <T = any>(data: any, formatter?: (data: any) => any): T => {
  if (formatter && data) {
    return formatter(data);
  }

  return data;
};

export type UseFetchQueryParams = { page?: number; [key: string]: unknown };

type UseFetchProps<
  Data = unknown,
  Error = unknown,
  DataFormatted = unknown,
  QueryParamType = UseFetchQueryParams,
> = {
  options?: UseFetchOptions<Data, Error>;
  formatter?: (data: Data) => DataFormatted;
  query?: UseFetchQueryParams & QueryParamType;
};


export const useFetchInfinite = <
  Data = unknown,
  Error = unknown,
  DataFormatted = undefined
>(
  url: string,
  config?: UseFetchProps
) => {
  const { formatter, options, query } = config || {};
  
  type Response = DataFormatted extends undefined ? Data[] : DataFormatted[];

 const { data, error, mutate, setSize, size, isLoading } = useSWRInfinite<
    Data,
    Error
  >(
    index => [`${url}?page=${index + 1}&limit=10, ...Object.values(query ?? {})`],
    async ([url]) => {
      const res = await api.get(url, {
        params: query
      });

      return res?.data;
    },
    {
      revalidateOnFocus: true,
      ...options,
    },
  );

  const list: Data[] = [];

  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === 'undefined';

  return {
    data: setResponse<Response>(data, formatter),
    error,
    mutate,
    isLoading,
    setSize,
    size,
    isLoadingMore,
  };
};