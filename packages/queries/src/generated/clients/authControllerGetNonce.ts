import client from "@repo/axios";
import type {
  AuthControllerGetNonceMutationRequest,
  AuthControllerGetNonceMutationResponse,
  AuthControllerGetNonce400,
} from "../models/AuthControllerGetNonce.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getAuthControllerGetNonceUrl() {
  return `/api/auth/nonce` as const;
}

/**
 * @summary Get nonce for Ethereum wallet authentication
 * {@link /api/auth/nonce}
 */
export async function authControllerGetNonce(
  data: AuthControllerGetNonceMutationRequest,
  config: Partial<RequestConfig<AuthControllerGetNonceMutationRequest>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    AuthControllerGetNonceMutationResponse,
    ResponseErrorConfig<AuthControllerGetNonce400>,
    AuthControllerGetNonceMutationRequest
  >({
    method: "POST",
    url: getAuthControllerGetNonceUrl().toString(),
    data,
    ...requestConfig,
  });
  return res.data;
}
