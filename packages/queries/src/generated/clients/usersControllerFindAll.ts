import client from "@repo/axios";
import type { UsersControllerFindAllQueryResponse } from "../models/UsersControllerFindAll.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getUsersControllerFindAllUrl() {
  return `/api/users` as const;
}

/**
 * @summary Get all users
 * {@link /api/users}
 */
export async function usersControllerFindAll(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UsersControllerFindAllQueryResponse,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: "GET",
    url: getUsersControllerFindAllUrl().toString(),
    ...requestConfig,
  });
  return res.data;
}
