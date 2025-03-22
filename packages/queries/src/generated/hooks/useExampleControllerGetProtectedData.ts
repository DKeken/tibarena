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
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { exampleControllerGetProtectedData } from "../clients/exampleControllerGetProtectedData.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const exampleControllerGetProtectedDataQueryKey = () =>
  [{ url: "/api/example/protected" }] as const;

export type ExampleControllerGetProtectedDataQueryKey = ReturnType<
  typeof exampleControllerGetProtectedDataQueryKey
>;

export function exampleControllerGetProtectedDataQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = exampleControllerGetProtectedDataQueryKey();
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
export function useExampleControllerGetProtectedData<
  TData = ExampleControllerGetProtectedDataQueryResponse,
  TQueryData = ExampleControllerGetProtectedDataQueryResponse,
  TQueryKey extends QueryKey = ExampleControllerGetProtectedDataQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        ExampleControllerGetProtectedDataQueryResponse,
        ResponseErrorConfig<ExampleControllerGetProtectedData401>,
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
    queryOptions?.queryKey ?? exampleControllerGetProtectedDataQueryKey();

  const query = useQuery({
    ...(exampleControllerGetProtectedDataQueryOptions(
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<ExampleControllerGetProtectedData401>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
