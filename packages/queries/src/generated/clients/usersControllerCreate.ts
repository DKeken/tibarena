import client from "@repo/axios";
import type {
  UsersControllerCreateMutationRequest,
  UsersControllerCreateMutationResponse,
  UsersControllerCreate400,
} from "../models/UsersControllerCreate.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getUsersControllerCreateUrl() {
  return `/api/users` as const;
}

/**
 * @summary Create new user
 * {@link /api/users}
 */
export async function usersControllerCreate(
  data: UsersControllerCreateMutationRequest,
  config: Partial<RequestConfig<UsersControllerCreateMutationRequest>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UsersControllerCreateMutationResponse,
    ResponseErrorConfig<UsersControllerCreate400>,
    UsersControllerCreateMutationRequest
  >({
    method: "POST",
    url: getUsersControllerCreateUrl().toString(),
    data,
    ...requestConfig,
  });
  return res.data;
}
