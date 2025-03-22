import client from "@kubb/plugin-client/clients/axios";
import type { UsersControllerFindAllQueryResponse } from "../models/UsersControllerFindAll.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { usersControllerFindAll } from "../clients/usersControllerFindAll.ts";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const usersControllerFindAllSuspenseQueryKey = () =>
  [{ url: "/api/users" }] as const;

export type UsersControllerFindAllSuspenseQueryKey = ReturnType<
  typeof usersControllerFindAllSuspenseQueryKey
>;

export function usersControllerFindAllSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = usersControllerFindAllSuspenseQueryKey();
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
export function useUsersControllerFindAllSuspense<
  TData = UsersControllerFindAllQueryResponse,
  TQueryData = UsersControllerFindAllQueryResponse,
  TQueryKey extends QueryKey = UsersControllerFindAllSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        UsersControllerFindAllQueryResponse,
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
    queryOptions?.queryKey ?? usersControllerFindAllSuspenseQueryKey();

  const query = useSuspenseQuery({
    ...(usersControllerFindAllSuspenseQueryOptions(
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
