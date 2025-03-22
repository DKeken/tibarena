import type { LoginDto } from "./LoginDto.ts";
import type { LoginResponseDto } from "./LoginResponseDto.ts";

/**
 * @description Authentication successful
 */
export type AuthControllerLogin200 = LoginResponseDto;

/**
 * @description Invalid signature
 */
export type AuthControllerLogin401 = any;

export type AuthControllerLoginMutationRequest = LoginDto;

export type AuthControllerLoginMutationResponse = AuthControllerLogin200;

export type AuthControllerLoginMutation = {
  Response: AuthControllerLogin200;
  Request: AuthControllerLoginMutationRequest;
  Errors: AuthControllerLogin401;
};
