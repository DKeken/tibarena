import client from "@kubb/plugin-client/clients/axios";
import type {
  UsersControllerFindOneQueryResponse,
  UsersControllerFindOnePathParams,
  UsersControllerFindOne404,
} from "../models/UsersControllerFindOne.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { usersControllerFindOne } from "../clients/usersControllerFindOne.ts";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const usersControllerFindOneSuspenseQueryKey = (
  id: UsersControllerFindOnePathParams["id"],
) => [{ url: "/api/users/:id", params: { id: id } }] as const;

export type UsersControllerFindOneSuspenseQueryKey = ReturnType<
  typeof usersControllerFindOneSuspenseQueryKey
>;

export function usersControllerFindOneSuspenseQueryOptions(
  id: UsersControllerFindOnePathParams["id"],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = usersControllerFindOneSuspenseQueryKey(id);
  return queryOptions<
    UsersControllerFindOneQueryResponse,
    ResponseErrorConfig<UsersControllerFindOne404>,
    UsersControllerFindOneQueryResponse,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return usersControllerFindOne(id, config);
    },
  });
}

/**
 * @summary Get user by id
 * {@link /api/users/:id}
 */
export function useUsersControllerFindOneSuspense<
  TData = UsersControllerFindOneQueryResponse,
  TQueryData = UsersControllerFindOneQueryResponse,
  TQueryKey extends QueryKey = UsersControllerFindOneSuspenseQueryKey,
>(
  id: UsersControllerFindOnePathParams["id"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        UsersControllerFindOneQueryResponse,
        ResponseErrorConfig<UsersControllerFindOne404>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? usersControllerFindOneSuspenseQueryKey(id);

  const query = useSuspenseQuery({
    ...(usersControllerFindOneSuspenseQueryOptions(
      id,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<UsersControllerFindOne404>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
