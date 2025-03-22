import client from "@repo/axios";
import type {
  UsersControllerRemoveMutationResponse,
  UsersControllerRemovePathParams,
  UsersControllerRemove404,
} from "../models/UsersControllerRemove.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getUsersControllerRemoveUrl(
  id: UsersControllerRemovePathParams["id"],
) {
  return `/api/users/${id}` as const;
}

/**
 * @summary Delete user
 * {@link /api/users/:id}
 */
export async function usersControllerRemove(
  id: UsersControllerRemovePathParams["id"],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UsersControllerRemoveMutationResponse,
    ResponseErrorConfig<UsersControllerRemove404>,
    unknown
  >({
    method: "DELETE",
    url: getUsersControllerRemoveUrl(id).toString(),
    ...requestConfig,
  });
  return res.data;
}
