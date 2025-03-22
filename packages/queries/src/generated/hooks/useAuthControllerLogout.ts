import client from "@kubb/plugin-client/clients/axios";
import type { AuthControllerLogoutMutationResponse } from "../models/AuthControllerLogout.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import { authControllerLogout } from "../clients/authControllerLogout.ts";
import { useMutation } from "@tanstack/react-query";

export const authControllerLogoutMutationKey = () =>
  [{ url: "/api/auth/logout" }] as const;

export type AuthControllerLogoutMutationKey = ReturnType<
  typeof authControllerLogoutMutationKey
>;

/**
 * @summary Log out the current user
 * {@link /api/auth/logout}
 */
export function useAuthControllerLogout<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AuthControllerLogoutMutationResponse,
      ResponseErrorConfig<Error>,
      undefined,
      TContext
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? authControllerLogoutMutationKey();

  return useMutation<
    AuthControllerLogoutMutationResponse,
    ResponseErrorConfig<Error>,
    undefined,
    TContext
  >({
    mutationFn: async () => {
      return authControllerLogout(config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
