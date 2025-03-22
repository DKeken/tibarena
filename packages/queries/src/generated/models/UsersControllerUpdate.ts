import type { UpdateUserDto } from "./UpdateUserDto.ts";

export type UsersControllerUpdatePathParams = {
  /**
   * @type string
   */
  id: string;
};

/**
 * @description User successfully updated
 */
export type UsersControllerUpdate200 = any;

/**
 * @description User not found
 */
export type UsersControllerUpdate404 = any;

export type UsersControllerUpdateMutationRequest = UpdateUserDto;

export type UsersControllerUpdateMutationResponse = UsersControllerUpdate200;

export type UsersControllerUpdateMutation = {
  Response: UsersControllerUpdate200;
  Request: UsersControllerUpdateMutationRequest;
  PathParams: UsersControllerUpdatePathParams;
  Errors: UsersControllerUpdate404;
};
