import client from "@kubb/plugin-client/clients/axios";
import type {
  SimplifiedExampleControllerGetProtectedDataQueryResponse,
  SimplifiedExampleControllerGetProtectedData401,
} from "../models/SimplifiedExampleControllerGetProtectedData.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { simplifiedExampleControllerGetProtectedData } from "../clients/simplifiedExampleControllerGetProtectedData.ts";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const simplifiedExampleControllerGetProtectedDataSuspenseQueryKey = () =>
  [{ url: "/api/jwt-example/protected" }] as const;

export type SimplifiedExampleControllerGetProtectedDataSuspenseQueryKey =
  ReturnType<
    typeof simplifiedExampleControllerGetProtectedDataSuspenseQueryKey
  >;

export function simplifiedExampleControllerGetProtectedDataSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey =
    simplifiedExampleControllerGetProtectedDataSuspenseQueryKey();
  return queryOptions<
    SimplifiedExampleControllerGetProtectedDataQueryResponse,
    ResponseErrorConfig<SimplifiedExampleControllerGetProtectedData401>,
    SimplifiedExampleControllerGetProtectedDataQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return simplifiedExampleControllerGetProtectedData(config);
    },
  });
}

/**
 * @summary Get protected user data using JWT
 * {@link /api/jwt-example/protected}
 */
export function useSimplifiedExampleControllerGetProtectedDataSuspense<
  TData = SimplifiedExampleControllerGetProtectedDataQueryResponse,
  TQueryData = SimplifiedExampleControllerGetProtectedDataQueryResponse,
  TQueryKey extends
    QueryKey = SimplifiedExampleControllerGetProtectedDataSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        SimplifiedExampleControllerGetProtectedDataQueryResponse,
        ResponseErrorConfig<SimplifiedExampleControllerGetProtectedData401>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    simplifiedExampleControllerGetProtectedDataSuspenseQueryKey();

  const query = useSuspenseQuery({
    ...(simplifiedExampleControllerGetProtectedDataSuspenseQueryOptions(
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<SimplifiedExampleControllerGetProtectedData401>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
