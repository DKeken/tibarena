import client from "@kubb/plugin-client/clients/axios";
import type {
  UsersControllerCreateMutationRequest,
  UsersControllerCreateMutationResponse,
  UsersControllerCreate400,
} from "../models/UsersControllerCreate.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import { usersControllerCreate } from "../clients/usersControllerCreate.ts";
import { useMutation } from "@tanstack/react-query";

export const usersControllerCreateMutationKey = () =>
  [{ url: "/api/users" }] as const;

export type UsersControllerCreateMutationKey = ReturnType<
  typeof usersControllerCreateMutationKey
>;

/**
 * @summary Create new user
 * {@link /api/users}
 */
export function useUsersControllerCreate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UsersControllerCreateMutationResponse,
      ResponseErrorConfig<UsersControllerCreate400>,
      { data: UsersControllerCreateMutationRequest },
      TContext
    >;
    client?: Partial<RequestConfig<UsersControllerCreateMutationRequest>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? usersControllerCreateMutationKey();

  return useMutation<
    UsersControllerCreateMutationResponse,
    ResponseErrorConfig<UsersControllerCreate400>,
    { data: UsersControllerCreateMutationRequest },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return usersControllerCreate(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
