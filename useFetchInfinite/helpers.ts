type IQueryParam<
  T = Record<string, string | number | boolean | null | undefined>
> = T;

export const convertQueryObjectToString = (query: IQueryParam<any>) => {
  const queryArray = Object.entries(query);

  const removedEmptyQuery = queryArray.filter(
    ([, value]) => value !== undefined && value !== null
  );

 if (removedEmptyQuery.length === 0) {
    return '';
  }

  return `&${removedEmptyQuery
    .map(([key, value]) => {
      const content = Array.isArray(value) ? value.join(',') : value;

      return `${key}=${content}`;
    })
    .join('&')
    .replace(/&$/, '')}`;
};
