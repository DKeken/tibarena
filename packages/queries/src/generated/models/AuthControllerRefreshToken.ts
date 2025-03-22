/**
 * @description Token refreshed successfully
 */
export type AuthControllerRefreshToken200 = any;

/**
 * @description Invalid refresh token
 */
export type AuthControllerRefreshToken401 = any;

export type AuthControllerRefreshTokenMutationResponse =
  AuthControllerRefreshToken200;

export type AuthControllerRefreshTokenMutation = {
  Response: AuthControllerRefreshToken200;
  Errors: AuthControllerRefreshToken401;
};
