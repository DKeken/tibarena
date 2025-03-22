import type { GetNonceDto } from "./GetNonceDto.ts";
import type { NonceResponseDto } from "./NonceResponseDto.ts";

/**
 * @description Nonce generated successfully
 */
export type AuthControllerGetNonce200 = NonceResponseDto;

/**
 * @description Invalid wallet address
 */
export type AuthControllerGetNonce400 = any;

export type AuthControllerGetNonceMutationRequest = GetNonceDto;

export type AuthControllerGetNonceMutationResponse = AuthControllerGetNonce200;

export type AuthControllerGetNonceMutation = {
  Response: AuthControllerGetNonce200;
  Request: AuthControllerGetNonceMutationRequest;
  Errors: AuthControllerGetNonce400;
};
