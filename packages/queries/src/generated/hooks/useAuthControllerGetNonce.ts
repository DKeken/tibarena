import client from "@kubb/plugin-client/clients/axios";
import type {
  AuthControllerGetNonceMutationRequest,
  AuthControllerGetNonceMutationResponse,
  AuthControllerGetNonce400,
} from "../models/AuthControllerGetNonce.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import { authControllerGetNonce } from "../clients/authControllerGetNonce.ts";
import { useMutation } from "@tanstack/react-query";

export const authControllerGetNonceMutationKey = () =>
  [{ url: "/api/auth/nonce" }] as const;

export type AuthControllerGetNonceMutationKey = ReturnType<
  typeof authControllerGetNonceMutationKey
>;

/**
 * @summary Get nonce for Ethereum wallet authentication
 * {@link /api/auth/nonce}
 */
export function useAuthControllerGetNonce<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AuthControllerGetNonceMutationResponse,
      ResponseErrorConfig<AuthControllerGetNonce400>,
      { data: AuthControllerGetNonceMutationRequest },
      TContext
    >;
    client?: Partial<RequestConfig<AuthControllerGetNonceMutationRequest>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? authControllerGetNonceMutationKey();

  return useMutation<
    AuthControllerGetNonceMutationResponse,
    ResponseErrorConfig<AuthControllerGetNonce400>,
    { data: AuthControllerGetNonceMutationRequest },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return authControllerGetNonce(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
