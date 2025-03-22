import client from "@repo/axios";
import type {
  SimplifiedExampleControllerGetProtectedDataQueryResponse,
  SimplifiedExampleControllerGetProtectedData401,
} from "../models/SimplifiedExampleControllerGetProtectedData.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getSimplifiedExampleControllerGetProtectedDataUrl() {
  return `/api/jwt-example/protected` as const;
}

/**
 * @summary Get protected user data using JWT
 * {@link /api/jwt-example/protected}
 */
export async function simplifiedExampleControllerGetProtectedData(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    SimplifiedExampleControllerGetProtectedDataQueryResponse,
    ResponseErrorConfig<SimplifiedExampleControllerGetProtectedData401>,
    unknown
  >({
    method: "GET",
    url: getSimplifiedExampleControllerGetProtectedDataUrl().toString(),
    ...requestConfig,
  });
  return res.data;
}
