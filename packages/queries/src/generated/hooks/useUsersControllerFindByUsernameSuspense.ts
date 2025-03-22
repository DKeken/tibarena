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
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { usersControllerFindByUsername } from "../clients/usersControllerFindByUsername.ts";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const usersControllerFindByUsernameSuspenseQueryKey = (
  username: UsersControllerFindByUsernamePathParams["username"],
) =>
  [
    { url: "/api/users/username/:username", params: { username: username } },
  ] as const;

export type UsersControllerFindByUsernameSuspenseQueryKey = ReturnType<
  typeof usersControllerFindByUsernameSuspenseQueryKey
>;

export function usersControllerFindByUsernameSuspenseQueryOptions(
  username: UsersControllerFindByUsernamePathParams["username"],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = usersControllerFindByUsernameSuspenseQueryKey(username);
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
export function useUsersControllerFindByUsernameSuspense<
  TData = UsersControllerFindByUsernameQueryResponse,
  TQueryData = UsersControllerFindByUsernameQueryResponse,
  TQueryKey extends QueryKey = UsersControllerFindByUsernameSuspenseQueryKey,
>(
  username: UsersControllerFindByUsernamePathParams["username"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        UsersControllerFindByUsernameQueryResponse,
        ResponseErrorConfig<UsersControllerFindByUsername404>,
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
    usersControllerFindByUsernameSuspenseQueryKey(username);

  const query = useSuspenseQuery({
    ...(usersControllerFindByUsernameSuspenseQueryOptions(
      username,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<UsersControllerFindByUsername404>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
