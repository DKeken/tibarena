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
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { usersControllerFindOne } from "../clients/usersControllerFindOne.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const usersControllerFindOneQueryKey = (
  id: UsersControllerFindOnePathParams["id"],
) => [{ url: "/api/users/:id", params: { id: id } }] as const;

export type UsersControllerFindOneQueryKey = ReturnType<
  typeof usersControllerFindOneQueryKey
>;

export function usersControllerFindOneQueryOptions(
  id: UsersControllerFindOnePathParams["id"],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = usersControllerFindOneQueryKey(id);
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
export function useUsersControllerFindOne<
  TData = UsersControllerFindOneQueryResponse,
  TQueryData = UsersControllerFindOneQueryResponse,
  TQueryKey extends QueryKey = UsersControllerFindOneQueryKey,
>(
  id: UsersControllerFindOnePathParams["id"],
  options: {
    query?: Partial<
      QueryObserverOptions<
        UsersControllerFindOneQueryResponse,
        ResponseErrorConfig<UsersControllerFindOne404>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? usersControllerFindOneQueryKey(id);

  const query = useQuery({
    ...(usersControllerFindOneQueryOptions(
      id,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<UsersControllerFindOne404>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
