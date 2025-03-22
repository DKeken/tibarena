import client from "@kubb/plugin-client/clients/axios";
import type {
  UsersControllerRemoveMutationResponse,
  UsersControllerRemovePathParams,
  UsersControllerRemove404,
} from "../models/UsersControllerRemove.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import { usersControllerRemove } from "../clients/usersControllerRemove.ts";
import { useMutation } from "@tanstack/react-query";

export const usersControllerRemoveMutationKey = () =>
  [{ url: "/api/users/{id}" }] as const;

export type UsersControllerRemoveMutationKey = ReturnType<
  typeof usersControllerRemoveMutationKey
>;

/**
 * @summary Delete user
 * {@link /api/users/:id}
 */
export function useUsersControllerRemove<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UsersControllerRemoveMutationResponse,
      ResponseErrorConfig<UsersControllerRemove404>,
      { id: UsersControllerRemovePathParams["id"] },
      TContext
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? usersControllerRemoveMutationKey();

  return useMutation<
    UsersControllerRemoveMutationResponse,
    ResponseErrorConfig<UsersControllerRemove404>,
    { id: UsersControllerRemovePathParams["id"] },
    TContext
  >({
    mutationFn: async ({ id }) => {
      return usersControllerRemove(id, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
