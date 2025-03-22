import client from "@repo/axios";
import type { AppControllerGetHealthQueryResponse } from "../models/AppControllerGetHealth.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getAppControllerGetHealthUrl() {
  return `/api/health` as const;
}

/**
 * {@link /api/health}
 */
export async function appControllerGetHealth(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    AppControllerGetHealthQueryResponse,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: "GET",
    url: getAppControllerGetHealthUrl().toString(),
    ...requestConfig,
  });
  return res.data;
}
