import client from "@repo/axios";
import type {
  ExampleControllerGetProtectedDataQueryResponse,
  ExampleControllerGetProtectedData401,
} from "../models/ExampleControllerGetProtectedData.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getExampleControllerGetProtectedDataUrl() {
  return `/api/example/protected` as const;
}

/**
 * @summary Get protected user data
 * {@link /api/example/protected}
 */
export async function exampleControllerGetProtectedData(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    ExampleControllerGetProtectedDataQueryResponse,
    ResponseErrorConfig<ExampleControllerGetProtectedData401>,
    unknown
  >({
    method: "GET",
    url: getExampleControllerGetProtectedDataUrl().toString(),
    ...requestConfig,
  });
  return res.data;
}
