import client from "@repo/axios";
import type {
  AuthControllerLoginMutationRequest,
  AuthControllerLoginMutationResponse,
  AuthControllerLogin401,
} from "../models/AuthControllerLogin.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getAuthControllerLoginUrl() {
  return `/api/auth/login` as const;
}

/**
 * @summary Authenticate using Ethereum wallet signature
 * {@link /api/auth/login}
 */
export async function authControllerLogin(
  data: AuthControllerLoginMutationRequest,
  config: Partial<RequestConfig<AuthControllerLoginMutationRequest>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    AuthControllerLoginMutationResponse,
    ResponseErrorConfig<AuthControllerLogin401>,
    AuthControllerLoginMutationRequest
  >({
    method: "POST",
    url: getAuthControllerLoginUrl().toString(),
    data,
    ...requestConfig,
  });
  return res.data;
}
