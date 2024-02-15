import axios from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

import { TResponse } from '@/app/types/responses';
import { SortingState } from '@tanstack/react-table';

type QueryParams = Record<string, any> & {
  pageIndex?: number;
  sorting?: SortingState;
};

export const useFetch = <TQueryFnData = TResponse, TError = unknown>(
  url: string,
  fetchConfig?: {
    query?: QueryParams;
    options?: Omit<
      UseQueryOptions<TQueryFnData, TError>,
      'queryKey' | 'queryFn'
    >;
  },
) => {
  const fetchData = useQuery<TQueryFnData, TError>(
    [url, fetchConfig?.query],
    async ({ queryKey }) => {
      const [_key, query] = queryKey as [string, QueryParams];

      const { pageIndex, sorting, ...rest } = query ?? {};

      const { data } = await axios.get<TQueryFnData>(url, {
        baseURL: '/api',
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
