import { KeyedMutator } from 'swr';

import { useFetch, UseFetchOptions, UseFetchQueryParams } from './useFetch';

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


type QueryParams = Record<string, any> & {
  pageIndex?: number;
  sorting?: { id:string; direction: 'desc' | 'asc' }; // or SortingState if using tanstack table
};

type UseSelectOptionsResponse<T> = {
  options: SelectOptions<T>[];
  refetch: KeyedMutator<TResponse<SelectOptions<T>[]>>;
  isLoading: boolean;
};


type Endpoints =
  | '/example'
  | '/example2';

export const useSelectOptions = <T = string | number | boolean | Date>(
  endpoint: Endpoints,
  useFetchOptions?: {
    query?: UseFetchQueryParams;
    fetchOptions?: UseFetchOptions<TResponse<SelectOptions<T>[]>, TResponse>;
  },
): UseSelectOptionsResponse<T> => {
  const { data, error, isLoading, mutate: refetch } = useFetch<
    TResponse<SelectOptions<T>[]>
  >(`/select-options${endpoint}`, {
    options: useFetchOptions?.fetchOptions,
    query: useFetchOptions?.query,
  });

  const optionsData = isLoading ? [] : data?.payload || [];

  return { options: optionsData, refetch, isLoading };
};
