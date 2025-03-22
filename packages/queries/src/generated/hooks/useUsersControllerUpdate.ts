import client from "@kubb/plugin-client/clients/axios";
import type {
  UsersControllerUpdateMutationRequest,
  UsersControllerUpdateMutationResponse,
  UsersControllerUpdatePathParams,
  UsersControllerUpdate404,
} from "../models/UsersControllerUpdate.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import { usersControllerUpdate } from "../clients/usersControllerUpdate.ts";
import { useMutation } from "@tanstack/react-query";

export const usersControllerUpdateMutationKey = () =>
  [{ url: "/api/users/{id}" }] as const;

export type UsersControllerUpdateMutationKey = ReturnType<
  typeof usersControllerUpdateMutationKey
>;

/**
 * @summary Update user
 * {@link /api/users/:id}
 */
export function useUsersControllerUpdate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UsersControllerUpdateMutationResponse,
      ResponseErrorConfig<UsersControllerUpdate404>,
      {
        id: UsersControllerUpdatePathParams["id"];
        data?: UsersControllerUpdateMutationRequest;
      },
      TContext
    >;
    client?: Partial<RequestConfig<UsersControllerUpdateMutationRequest>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? usersControllerUpdateMutationKey();

  return useMutation<
    UsersControllerUpdateMutationResponse,
    ResponseErrorConfig<UsersControllerUpdate404>,
    {
      id: UsersControllerUpdatePathParams["id"];
      data?: UsersControllerUpdateMutationRequest;
    },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return usersControllerUpdate(id, data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
