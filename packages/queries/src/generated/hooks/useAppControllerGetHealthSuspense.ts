import client from "@kubb/plugin-client/clients/axios";
import type { AppControllerGetHealthQueryResponse } from "../models/AppControllerGetHealth.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { appControllerGetHealth } from "../clients/appControllerGetHealth.ts";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const appControllerGetHealthSuspenseQueryKey = () =>
  [{ url: "/api/health" }] as const;

export type AppControllerGetHealthSuspenseQueryKey = ReturnType<
  typeof appControllerGetHealthSuspenseQueryKey
>;

export function appControllerGetHealthSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = appControllerGetHealthSuspenseQueryKey();
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
export function useAppControllerGetHealthSuspense<
  TData = AppControllerGetHealthQueryResponse,
  TQueryData = AppControllerGetHealthQueryResponse,
  TQueryKey extends QueryKey = AppControllerGetHealthSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        AppControllerGetHealthQueryResponse,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? appControllerGetHealthSuspenseQueryKey();

  const query = useSuspenseQuery({
    ...(appControllerGetHealthSuspenseQueryOptions(
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
