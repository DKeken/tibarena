import client from "@kubb/plugin-client/clients/axios";
import type { UsersControllerFindAllQueryResponse } from "../models/UsersControllerFindAll.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type {
  QueryKey,
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { usersControllerFindAll } from "../clients/usersControllerFindAll.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const usersControllerFindAllQueryKey = () =>
  [{ url: "/api/users" }] as const;

export type UsersControllerFindAllQueryKey = ReturnType<
  typeof usersControllerFindAllQueryKey
>;

export function usersControllerFindAllQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = usersControllerFindAllQueryKey();
  return queryOptions<
    UsersControllerFindAllQueryResponse,
    ResponseErrorConfig<Error>,
    UsersControllerFindAllQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return usersControllerFindAll(config);
    },
  });
}

/**
 * @summary Get all users
 * {@link /api/users}
 */
export function useUsersControllerFindAll<
  TData = UsersControllerFindAllQueryResponse,
  TQueryData = UsersControllerFindAllQueryResponse,
  TQueryKey extends QueryKey = UsersControllerFindAllQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        UsersControllerFindAllQueryResponse,
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
  const queryKey = queryOptions?.queryKey ?? usersControllerFindAllQueryKey();

  const query = useQuery({
    ...(usersControllerFindAllQueryOptions(
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
