type ToUrlSearchParamsInputType =
  | string
  | URLSearchParams
  | string[][]
  | Record<string, string | number | null | undefined>
  | null;

export const toURLSearchParams = (search?: ToUrlSearchParamsInputType) => {
  if (search instanceof URLSearchParams) {
    return search;
  }
  return new URLSearchParams(
    Object.fromEntries(
      Object.entries(search || {}).filter(
        ([, value]) => ![null, undefined, ""].includes(value)
      )
    )
  );
};

export const mergeURLSearchParams = (query: URLSearchParams, next = {}) =>
  toURLSearchParams({
    ...Object.fromEntries(query.entries()),
    ...next,
  });
