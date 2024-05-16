// eslint-disable-next-line import/no-unresolved
import useSWR, { BareFetcher } from 'swr';
import { KeyedMutator, PublicConfiguration } from 'swr/_internal';

export type UseFetchOptions<Data = unknown, Error = unknown> = Partial<
  PublicConfiguration<Data, Error, BareFetcher<Data>>
>;

export type UseFetchQueryParams = Record<string, any> & {
  page?: number;
  // sorting?: SortingState; // Tanstack table type - Adapt for your use case
};


type UseFetchProps<
  Data = unknown,
  Error = unknown
> = {
  options?: UseFetchOptions<Data, Error>;
  query?: UseFetchQueryParams;
};

type ResponseFetch<
  Data = unknown,
  Error = unknown,
> = {
  data: Data;
  error: Error | undefined;
  mutate: KeyedMutator<Data>;
  isLoading: boolean;
  isValidating: boolean;
};


export const useFetch = <
  Data = unknown,
  Error = unknown
>(
  url: string,
  config?: UseFetchProps<Data, Error>,
): ResponseFetch<Data, Error> => {
  const { options, query } = config || {};

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
    data,
    error,
    mutate: mutate,
    isLoading: isLoading,
    isValidating,
  };
};