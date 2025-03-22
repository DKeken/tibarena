import client from "@kubb/plugin-client/clients/axios";
import type {
  UsersControllerFindByEmailQueryResponse,
  UsersControllerFindByEmailPathParams,
  UsersControllerFindByEmail404,
} from "../models/UsersControllerFindByEmail.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type {
  QueryKey,
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { usersControllerFindByEmail } from "../clients/usersControllerFindByEmail.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const usersControllerFindByEmailQueryKey = (
  email: UsersControllerFindByEmailPathParams["email"],
) => [{ url: "/api/users/email/:email", params: { email: email } }] as const;

export type UsersControllerFindByEmailQueryKey = ReturnType<
  typeof usersControllerFindByEmailQueryKey
>;

export function usersControllerFindByEmailQueryOptions(
  email: UsersControllerFindByEmailPathParams["email"],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = usersControllerFindByEmailQueryKey(email);
  return queryOptions<
    UsersControllerFindByEmailQueryResponse,
    ResponseErrorConfig<UsersControllerFindByEmail404>,
    UsersControllerFindByEmailQueryResponse,
    typeof queryKey
  >({
    enabled: !!email,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return usersControllerFindByEmail(email, config);
    },
  });
}

/**
 * @summary Get user by email
 * {@link /api/users/email/:email}
 */
export function useUsersControllerFindByEmail<
  TData = UsersControllerFindByEmailQueryResponse,
  TQueryData = UsersControllerFindByEmailQueryResponse,
  TQueryKey extends QueryKey = UsersControllerFindByEmailQueryKey,
>(
  email: UsersControllerFindByEmailPathParams["email"],
  options: {
    query?: Partial<
      QueryObserverOptions<
        UsersControllerFindByEmailQueryResponse,
        ResponseErrorConfig<UsersControllerFindByEmail404>,
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
    queryOptions?.queryKey ?? usersControllerFindByEmailQueryKey(email);

  const query = useQuery({
    ...(usersControllerFindByEmailQueryOptions(
      email,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<UsersControllerFindByEmail404>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
