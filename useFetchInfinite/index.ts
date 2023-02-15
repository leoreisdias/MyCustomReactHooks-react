// NOTE: Complete use Fetch helper around useSWRInfinite fully typed to receive response formatter and typed query params

import { BareFetcher } from "swr";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

import { convertQueryObjectToString } from "./helpers";

export type IQueryParam<
  T = Record<string, string | number | boolean | null | undefined>
> = T;

type UseFetchOptions<Data = unknown, Error = unknown> = Partial<
  SWRInfiniteConfiguration<Data, Error, BareFetcher<Data>>
>;

const useFetchInfinite = <
  Data = unknown,
  Error = unknown,
  DataFormatted = undefined
>(
  url: string,
  options?: UseFetchOptions<Data, Error>,
  formatter?: (data: Data[]) => DataFormatted[],
  query?: IQueryParam
) => {
  type Response = DataFormatted extends undefined ? Data[] : DataFormatted[];

 const { data, error, mutate, setSize, size, isLoading } = useSWRInfinite<
    Data,
    Error
  >(
    index =>
      `${url}?page=${index + 1}&limit=10${
        query ? `${convertQueryObjectToString(query)}` : ''
      }`,
    async url => {
      const res = await api.get(url);

      if (formatter) {
        return formatter(res.data.payload) as DataFormatted[];
      }

      return res?.data?.payload;
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
    data: (data ? list.concat(...data) : []) as Response,
    error,
    mutate,
    isLoading,
    setSize,
    size,
    isLoadingMore,
  };
};

export { useFetchInfinite };
