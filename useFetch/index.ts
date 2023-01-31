// NOTE: Complete use Fetch helper around useSWR fully typed to receive response formatter and typed query params

import useSWR, { BareFetcher } from "swr";

import { PublicConfiguration } from "swr/dist/types";

import { convertQueryObjectToString, setResponse } from "./helpers";

export type IQueryParam<
  T = Record<string, string | number | boolean | null | undefined>
> = T;

export type UseFetchOptions<Data = unknown, Error = unknown> = Partial<
  PublicConfiguration<Data, Error, BareFetcher<Data>>
>;

const useFetch = <
  Data = unknown,
  Error = unknown,
  DataFormatted = undefined,
  QueryParamType = any,
>(
  url: string,
  options?: UseFetchOptions<Data, Error>,
  formatter?: (data: Data) => DataFormatted,
  query?: IQueryParam<QueryParamType>,
) => {
  // NOTE: response is DataFormatted if exists, otherwise Data
  type Response = DataFormatted extends undefined ? Data : DataFormatted;

  const { data, error, mutate, isLoading, isValidating } = useSWR<Data, Error>(
    `${url}${query ? `?${convertQueryObjectToString(query)}` : ''}`,
    async url => {
      const res = await api.get(url);

      return res?.data;
    },
    {
      revalidateOnFocus: true,
      ...options,
    },
  );

  return {
    data: setResponse<Response | undefined>(data, formatter),
    error,
    mutate,
    isLoading: isLoading,
    isValidating,
  };
};

export { useFetch };
