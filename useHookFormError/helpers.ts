export const findKeyChainInsideObjectRecursive = (
  obj: any,
  key: string[]
): any => {
  if (key.length === 0) {
    return obj;
  }
  const [firstKey, ...rest] = key;
  if (obj[firstKey]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return findKeyChainInsideObjectRecursive(obj[firstKey], rest);
  }
  return undefined;
};
