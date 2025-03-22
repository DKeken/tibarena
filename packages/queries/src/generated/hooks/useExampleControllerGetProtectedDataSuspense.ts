import client from "@kubb/plugin-client/clients/axios";
import type {
  ExampleControllerGetProtectedDataQueryResponse,
  ExampleControllerGetProtectedData401,
} from "../models/ExampleControllerGetProtectedData.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { exampleControllerGetProtectedData } from "../clients/exampleControllerGetProtectedData.ts";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const exampleControllerGetProtectedDataSuspenseQueryKey = () =>
  [{ url: "/api/example/protected" }] as const;

export type ExampleControllerGetProtectedDataSuspenseQueryKey = ReturnType<
  typeof exampleControllerGetProtectedDataSuspenseQueryKey
>;

export function exampleControllerGetProtectedDataSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = exampleControllerGetProtectedDataSuspenseQueryKey();
  return queryOptions<
    ExampleControllerGetProtectedDataQueryResponse,
    ResponseErrorConfig<ExampleControllerGetProtectedData401>,
    ExampleControllerGetProtectedDataQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return exampleControllerGetProtectedData(config);
    },
  });
}

/**
 * @summary Get protected user data
 * {@link /api/example/protected}
 */
export function useExampleControllerGetProtectedDataSuspense<
  TData = ExampleControllerGetProtectedDataQueryResponse,
  TQueryData = ExampleControllerGetProtectedDataQueryResponse,
  TQueryKey extends
    QueryKey = ExampleControllerGetProtectedDataSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        ExampleControllerGetProtectedDataQueryResponse,
        ResponseErrorConfig<ExampleControllerGetProtectedData401>,
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
    exampleControllerGetProtectedDataSuspenseQueryKey();

  const query = useSuspenseQuery({
    ...(exampleControllerGetProtectedDataSuspenseQueryOptions(
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<ExampleControllerGetProtectedData401>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
