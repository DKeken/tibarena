import client from "@repo/axios";
import type {
  UsersControllerUpdateMutationRequest,
  UsersControllerUpdateMutationResponse,
  UsersControllerUpdatePathParams,
  UsersControllerUpdate404,
} from "../models/UsersControllerUpdate.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getUsersControllerUpdateUrl(
  id: UsersControllerUpdatePathParams["id"],
) {
  return `/api/users/${id}` as const;
}

/**
 * @summary Update user
 * {@link /api/users/:id}
 */
export async function usersControllerUpdate(
  id: UsersControllerUpdatePathParams["id"],
  data?: UsersControllerUpdateMutationRequest,
  config: Partial<RequestConfig<UsersControllerUpdateMutationRequest>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UsersControllerUpdateMutationResponse,
    ResponseErrorConfig<UsersControllerUpdate404>,
    UsersControllerUpdateMutationRequest
  >({
    method: "PATCH",
    url: getUsersControllerUpdateUrl(id).toString(),
    data,
    ...requestConfig,
  });
  return res.data;
}
