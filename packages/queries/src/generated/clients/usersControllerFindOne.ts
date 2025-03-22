import client from "@repo/axios";
import type {
  UsersControllerFindOneQueryResponse,
  UsersControllerFindOnePathParams,
  UsersControllerFindOne404,
} from "../models/UsersControllerFindOne.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getUsersControllerFindOneUrl(
  id: UsersControllerFindOnePathParams["id"],
) {
  return `/api/users/${id}` as const;
}

/**
 * @summary Get user by id
 * {@link /api/users/:id}
 */
export async function usersControllerFindOne(
  id: UsersControllerFindOnePathParams["id"],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UsersControllerFindOneQueryResponse,
    ResponseErrorConfig<UsersControllerFindOne404>,
    unknown
  >({
    method: "GET",
    url: getUsersControllerFindOneUrl(id).toString(),
    ...requestConfig,
  });
  return res.data;
}
