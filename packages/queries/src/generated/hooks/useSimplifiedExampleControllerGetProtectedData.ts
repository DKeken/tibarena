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
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { simplifiedExampleControllerGetProtectedData } from "../clients/simplifiedExampleControllerGetProtectedData.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const simplifiedExampleControllerGetProtectedDataQueryKey = () =>
  [{ url: "/api/jwt-example/protected" }] as const;

export type SimplifiedExampleControllerGetProtectedDataQueryKey = ReturnType<
  typeof simplifiedExampleControllerGetProtectedDataQueryKey
>;

export function simplifiedExampleControllerGetProtectedDataQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = simplifiedExampleControllerGetProtectedDataQueryKey();
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
export function useSimplifiedExampleControllerGetProtectedData<
  TData = SimplifiedExampleControllerGetProtectedDataQueryResponse,
  TQueryData = SimplifiedExampleControllerGetProtectedDataQueryResponse,
  TQueryKey extends
    QueryKey = SimplifiedExampleControllerGetProtectedDataQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        SimplifiedExampleControllerGetProtectedDataQueryResponse,
        ResponseErrorConfig<SimplifiedExampleControllerGetProtectedData401>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    simplifiedExampleControllerGetProtectedDataQueryKey();

  const query = useQuery({
    ...(simplifiedExampleControllerGetProtectedDataQueryOptions(
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<SimplifiedExampleControllerGetProtectedData401>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
