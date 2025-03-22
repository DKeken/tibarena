import client from "@repo/axios";
import type {
  UsersControllerFindByUsernameQueryResponse,
  UsersControllerFindByUsernamePathParams,
  UsersControllerFindByUsername404,
} from "../models/UsersControllerFindByUsername.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getUsersControllerFindByUsernameUrl(
  username: UsersControllerFindByUsernamePathParams["username"],
) {
  return `/api/users/username/${username}` as const;
}

/**
 * @summary Get user by username
 * {@link /api/users/username/:username}
 */
export async function usersControllerFindByUsername(
  username: UsersControllerFindByUsernamePathParams["username"],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UsersControllerFindByUsernameQueryResponse,
    ResponseErrorConfig<UsersControllerFindByUsername404>,
    unknown
  >({
    method: "GET",
    url: getUsersControllerFindByUsernameUrl(username).toString(),
    ...requestConfig,
  });
  return res.data;
}
