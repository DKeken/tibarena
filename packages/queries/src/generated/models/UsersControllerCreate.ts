import type { CreateUserDto } from "./CreateUserDto.ts";

/**
 * @description User successfully created
 */
export type UsersControllerCreate201 = any;

/**
 * @description Bad request
 */
export type UsersControllerCreate400 = any;

export type UsersControllerCreateMutationRequest = Omit<
  NonNullable<CreateUserDto>,
  "passwordHash" | "authNonce"
>;

export type UsersControllerCreateMutationResponse = UsersControllerCreate201;

export type UsersControllerCreateMutation = {
  Response: UsersControllerCreate201;
  Request: UsersControllerCreateMutationRequest;
  Errors: UsersControllerCreate400;
};
