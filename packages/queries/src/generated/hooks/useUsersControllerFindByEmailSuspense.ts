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
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { usersControllerFindByEmail } from "../clients/usersControllerFindByEmail.ts";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const usersControllerFindByEmailSuspenseQueryKey = (
  email: UsersControllerFindByEmailPathParams["email"],
) => [{ url: "/api/users/email/:email", params: { email: email } }] as const;

export type UsersControllerFindByEmailSuspenseQueryKey = ReturnType<
  typeof usersControllerFindByEmailSuspenseQueryKey
>;

export function usersControllerFindByEmailSuspenseQueryOptions(
  email: UsersControllerFindByEmailPathParams["email"],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = usersControllerFindByEmailSuspenseQueryKey(email);
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
export function useUsersControllerFindByEmailSuspense<
  TData = UsersControllerFindByEmailQueryResponse,
  TQueryData = UsersControllerFindByEmailQueryResponse,
  TQueryKey extends QueryKey = UsersControllerFindByEmailSuspenseQueryKey,
>(
  email: UsersControllerFindByEmailPathParams["email"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        UsersControllerFindByEmailQueryResponse,
        ResponseErrorConfig<UsersControllerFindByEmail404>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? usersControllerFindByEmailSuspenseQueryKey(email);

  const query = useSuspenseQuery({
    ...(usersControllerFindByEmailSuspenseQueryOptions(
      email,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<UsersControllerFindByEmail404>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
