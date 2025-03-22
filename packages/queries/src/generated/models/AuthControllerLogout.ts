import type { LogoutResponseDto } from "./LogoutResponseDto.ts";

/**
 * @description Logout successful
 */
export type AuthControllerLogout200 = LogoutResponseDto;

export type AuthControllerLogoutMutationResponse = AuthControllerLogout200;

export type AuthControllerLogoutMutation = {
  Response: AuthControllerLogout200;
  Errors: any;
};
