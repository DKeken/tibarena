import client from "@kubb/plugin-client/clients/axios";
import type {
  AuthControllerRefreshTokenMutationResponse,
  AuthControllerRefreshToken401,
} from "../models/AuthControllerRefreshToken.ts";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import { authControllerRefreshToken } from "../clients/authControllerRefreshToken.ts";
import { useMutation } from "@tanstack/react-query";

export const authControllerRefreshTokenMutationKey = () =>
  [{ url: "/api/auth/refresh" }] as const;

export type AuthControllerRefreshTokenMutationKey = ReturnType<
  typeof authControllerRefreshTokenMutationKey
>;

/**
 * @summary Refresh access token
 * {@link /api/auth/refresh}
 */
export function useAuthControllerRefreshToken<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AuthControllerRefreshTokenMutationResponse,
      ResponseErrorConfig<AuthControllerRefreshToken401>,
      undefined,
      TContext
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? authControllerRefreshTokenMutationKey();

  return useMutation<
    AuthControllerRefreshTokenMutationResponse,
    ResponseErrorConfig<AuthControllerRefreshToken401>,
    undefined,
    TContext
  >({
    mutationFn: async () => {
      return authControllerRefreshToken(config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
