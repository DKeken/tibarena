import client from "@repo/axios";
import type {
  UsersControllerFindByEmailQueryResponse,
  UsersControllerFindByEmailPathParams,
  UsersControllerFindByEmail404,
} from "../models/UsersControllerFindByEmail.ts";
import type { RequestConfig, ResponseErrorConfig } from "@repo/axios";

export function getUsersControllerFindByEmailUrl(
  email: UsersControllerFindByEmailPathParams["email"],
) {
  return `/api/users/email/${email}` as const;
}

/**
 * @summary Get user by email
 * {@link /api/users/email/:email}
 */
export async function usersControllerFindByEmail(
  email: UsersControllerFindByEmailPathParams["email"],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UsersControllerFindByEmailQueryResponse,
    ResponseErrorConfig<UsersControllerFindByEmail404>,
    unknown
  >({
    method: "GET",
    url: getUsersControllerFindByEmailUrl(email).toString(),
    ...requestConfig,
  });
  return res.data;
}
