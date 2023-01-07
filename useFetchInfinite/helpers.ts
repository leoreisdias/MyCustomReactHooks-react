type IQueryParam<
  T = Record<string, string | number | boolean | null | undefined>
> = T;

export const convertQueryObjectToString = (query: IQueryParam<any>) => {
  const queryArray = Object.entries(query);

  const removedEmptyQuery = queryArray.filter(
    ([, value]) => value !== undefined && value !== null
  );

  return removedEmptyQuery
    .map(([key, value]) => `${key}=${value}`)
    .join("&")
    .replace(/&$/, "");
};
