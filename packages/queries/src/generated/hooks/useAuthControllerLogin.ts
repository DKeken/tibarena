import client from "@kubb/plugin-client/clients/axios";
import type {
  AuthControllerLoginMutationRequest,
  AuthControllerLoginMutationResponse,
  AuthControllerLogin401,
} from "../models/AuthControllerLogin.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import { authControllerLogin } from "../clients/authControllerLogin.ts";
import { useMutation } from "@tanstack/react-query";

export const authControllerLoginMutationKey = () =>
  [{ url: "/api/auth/login" }] as const;

export type AuthControllerLoginMutationKey = ReturnType<
  typeof authControllerLoginMutationKey
>;

/**
 * @summary Authenticate using Ethereum wallet signature
 * {@link /api/auth/login}
 */
export function useAuthControllerLogin<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AuthControllerLoginMutationResponse,
      ResponseErrorConfig<AuthControllerLogin401>,
      { data: AuthControllerLoginMutationRequest },
      TContext
    >;
    client?: Partial<RequestConfig<AuthControllerLoginMutationRequest>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? authControllerLoginMutationKey();

  return useMutation<
    AuthControllerLoginMutationResponse,
    ResponseErrorConfig<AuthControllerLogin401>,
    { data: AuthControllerLoginMutationRequest },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return authControllerLogin(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
