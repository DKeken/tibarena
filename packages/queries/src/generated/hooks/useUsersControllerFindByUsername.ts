import client from "@kubb/plugin-client/clients/axios";
import type {
  UsersControllerFindByUsernameQueryResponse,
  UsersControllerFindByUsernamePathParams,
  UsersControllerFindByUsername404,
} from "../models/UsersControllerFindByUsername.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type {
  QueryKey,
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { usersControllerFindByUsername } from "../clients/usersControllerFindByUsername.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const usersControllerFindByUsernameQueryKey = (
  username: UsersControllerFindByUsernamePathParams["username"],
) =>
  [
    { url: "/api/users/username/:username", params: { username: username } },
  ] as const;

export type UsersControllerFindByUsernameQueryKey = ReturnType<
  typeof usersControllerFindByUsernameQueryKey
>;

export function usersControllerFindByUsernameQueryOptions(
  username: UsersControllerFindByUsernamePathParams["username"],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = usersControllerFindByUsernameQueryKey(username);
  return queryOptions<
    UsersControllerFindByUsernameQueryResponse,
    ResponseErrorConfig<UsersControllerFindByUsername404>,
    UsersControllerFindByUsernameQueryResponse,
    typeof queryKey
  >({
    enabled: !!username,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return usersControllerFindByUsername(username, config);
    },
  });
}

/**
 * @summary Get user by username
 * {@link /api/users/username/:username}
 */
export function useUsersControllerFindByUsername<
  TData = UsersControllerFindByUsernameQueryResponse,
  TQueryData = UsersControllerFindByUsernameQueryResponse,
  TQueryKey extends QueryKey = UsersControllerFindByUsernameQueryKey,
>(
  username: UsersControllerFindByUsernamePathParams["username"],
  options: {
    query?: Partial<
      QueryObserverOptions<
        UsersControllerFindByUsernameQueryResponse,
        ResponseErrorConfig<UsersControllerFindByUsername404>,
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
    queryOptions?.queryKey ?? usersControllerFindByUsernameQueryKey(username);

  const query = useQuery({
    ...(usersControllerFindByUsernameQueryOptions(
      username,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<UsersControllerFindByUsername404>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
