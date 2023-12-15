import { KeyedMutator } from 'swr';

import { useFetch, UseFetchOptions, UseFetchQueryParams } from './useFetch';

interface IResponse<T = any> {
    payload: T;
    statusCode: number;
    message: string;
}

type SelectOptions<T = string | number | boolean | Date> = {
    value: T;
    label: string;
    name?: string;
    disabled?: boolean;
};

type UseSelectOptionsResponse<T> = [
  options: SelectOptions<T>[],
  mutate: KeyedMutator<IResponse<SelectOptions<T>[]>>,
  isLoading: boolean,
];

type Endpoints =
  | '/example'
  | '/example2';

export const useSelectOptions = <T = string | number | boolean | Date>(
  endpoint: Endpoints,
  useFetchOptions?: {
    query?: UseFetchQueryParams;
    fetchOptions?: UseFetchOptions<IResponse<SelectOptions<T>[]>, IResponse>;
  },
): UseSelectOptionsResponse<T> => {
  const { data, error, isLoading, mutate } = useFetch<
    IResponse<SelectOptions<T>[]>,
    IResponse
  >(`/select-options${endpoint}`, {
    options: useFetchOptions?.fetchOptions,
    query: useFetchOptions?.query,
  });

  const options = !!error || isLoading ? [] : data.payload;

  return [options, mutate, isLoading];
};
