import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';

import { useFetch, UseFetchConfig, UseFetchQueryParams } from './useFetch';

type TResponse<T = any> = {
  payload: T;
  statusCode: number;
  message: string;
  isSuccess: boolean;
};

type SelectOptionValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;

type SelectOptions<T = SelectOptionValue> = {
    value: T;
    label: string;
    name?: string;
    disabled?: boolean;
};

type UseSelectOptionsResponse<T> = {
  options: SelectOptions<T>[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<UseFetchQueryParams, unknown>>;
  isLoading: boolean;
  isFetching: boolean;
};


type Endpoints =
  | '/example'
  | '/example2';

export const useSelectOptions = <T = string | number | boolean | Date>(
  endpoint: Endpoints,
  useFetchOptions?: {
    query?: UseFetchQueryParams;
    fetchOptions?: UseFetchConfig<TResponse<SelectOptions<T>[]>, TResponse>;
  },
): UseSelectOptionsResponse<T> => {
  const { data, refetch, isLoading, isFetching } = useFetch<
    TResponse<SelectOptions<T>[]>
  >(`/select-options${endpoint}`, {
    options: useFetchOptions?.fetchOptions,
    query: useFetchOptions?.query,
  });

  const optionsData = isLoading ? [] : data?.payload || [];

  return { options: optionsData, refetch, isFetching, isLoading };
};
