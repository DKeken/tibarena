import client from "@repo/axios";
import type {
  AuthControllerRefreshTokenMutationResponse,
  AuthControllerRefreshToken401,
} from "../models/AuthControllerRefreshToken.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getAuthControllerRefreshTokenUrl() {
  return `/api/auth/refresh` as const;
}

/**
 * @summary Refresh access token
 * {@link /api/auth/refresh}
 */
export async function authControllerRefreshToken(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    AuthControllerRefreshTokenMutationResponse,
    ResponseErrorConfig<AuthControllerRefreshToken401>,
    unknown
  >({
    method: "POST",
    url: getAuthControllerRefreshTokenUrl().toString(),
    ...requestConfig,
  });
  return res.data;
}
