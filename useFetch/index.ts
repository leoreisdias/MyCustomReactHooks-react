// eslint-disable-next-line import/no-unresolved
import useSWR, { BareFetcher } from 'swr';
import { PublicConfiguration } from 'swr/_internal';

export type UseFetchOptions<Data = unknown, Error = unknown> = Partial<
  PublicConfiguration<Data, Error, BareFetcher<Data>>
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

export const useFetch = <
  Data = unknown,
  Error = unknown,
  DataFormatted = undefined,
  QueryParamType = UseFetchQueryParams,
>(
  url: string,
  config?: UseFetchProps<Data, Error, DataFormatted, QueryParamType>,
) => {
  const { formatter, options, query } = config || {};
  // NOTE: response is DataFormatted if exists, otherwise Data
  type Response = DataFormatted extends undefined ? Data : DataFormatted;

  const { data, error, mutate, isLoading, isValidating } = useSWR<Data, Error>(
    [url, ...Object.values(query ?? {})],
    async ([url]) => {
      const res = await api.get(url, {
        params: query,
      });

      return res?.data;
    },
    {
      revalidateOnFocus: true,
      ...options,
    },
  );

  return {
    data: setResponse<Response>(data, formatter),
    error,
    mutate: mutate,
    isLoading: isLoading,
    isValidating,
  };
};