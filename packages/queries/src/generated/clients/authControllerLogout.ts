import client from "@repo/axios";
import type { AuthControllerLogoutMutationResponse } from "../models/AuthControllerLogout.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getAuthControllerLogoutUrl() {
  return `/api/auth/logout` as const;
}

/**
 * @summary Log out the current user
 * {@link /api/auth/logout}
 */
export async function authControllerLogout(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    AuthControllerLogoutMutationResponse,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: "POST",
    url: getAuthControllerLogoutUrl().toString(),
    ...requestConfig,
  });
  return res.data;
}
