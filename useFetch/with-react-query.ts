import axios from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

import { TResponse } from '@/app/types/responses';
import { SortingState } from '@tanstack/react-table';

export type UseFetchQueryParams = Record<string, any> & {
  pageIndex?: number;
  sorting?: SortingState; // Tanstack table type - Adapt for your use case
};

export type UseFetchConfig<TQueryFnData = TResponse, TError = unknown> = Omit<UseQueryOptions<TQueryFnData, TError>, 'queryKey' | 'queryFn'>;

export const useFetch = <TQueryFnData = TResponse, TError = unknown>(
  url: string,
  fetchConfig?: {
    query?: UseFetchQueryParams;
    options?: UseFetchConfig;
  },
) => {
  const fetchData = useQuery<TQueryFnData, TError>(
    [url, fetchConfig?.query],
    async ({ queryKey }) => {
      const [_key, query] = queryKey as [string, UseFetchQueryParams];

      const { pageIndex, sorting, ...rest } = query ?? {};

      const { data } = await axios.get<TQueryFnData>(url, {
        baseURL: '/api-front/my-api', // Route Handler Approach example -> Adapt for your Use Case
        params: {
          ...rest,
          page: !!pageIndex ? pageIndex + 1 : undefined,
          sorting,
        },
      });

      return data;
    },
    fetchConfig?.options,
  );

  return fetchData;
};
