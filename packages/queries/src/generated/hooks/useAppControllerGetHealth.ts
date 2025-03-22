import client from "@kubb/plugin-client/clients/axios";
import type { AppControllerGetHealthQueryResponse } from "../models/AppControllerGetHealth.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type {
  QueryKey,
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { appControllerGetHealth } from "../clients/appControllerGetHealth.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const appControllerGetHealthQueryKey = () =>
  [{ url: "/api/health" }] as const;

export type AppControllerGetHealthQueryKey = ReturnType<
  typeof appControllerGetHealthQueryKey
>;

export function appControllerGetHealthQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = appControllerGetHealthQueryKey();
  return queryOptions<
    AppControllerGetHealthQueryResponse,
    ResponseErrorConfig<Error>,
    AppControllerGetHealthQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return appControllerGetHealth(config);
    },
  });
}

/**
 * {@link /api/health}
 */
export function useAppControllerGetHealth<
  TData = AppControllerGetHealthQueryResponse,
  TQueryData = AppControllerGetHealthQueryResponse,
  TQueryKey extends QueryKey = AppControllerGetHealthQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        AppControllerGetHealthQueryResponse,
        ResponseErrorConfig<Error>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? appControllerGetHealthQueryKey();

  const query = useQuery({
    ...(appControllerGetHealthQueryOptions(
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
