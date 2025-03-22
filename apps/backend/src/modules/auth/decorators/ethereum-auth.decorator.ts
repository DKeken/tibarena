import { applyDecorators, UseGuards } from "@nestjs/common";
import { EthereumAuthGuard } from "../guards";

/**
 * Decorator for protecting routes with Ethereum wallet authentication
 * Combines UseGuards with the EthereumAuthGuard for cleaner controller code
 *
 * @example
 * ```typescript
 * @EthereumAuth()
 * @Get('profile')
 * getProfile(@Request() req) {
 *   return req.user;
 * }
 * ```
 */
export function EthereumAuth() {
  return applyDecorators(UseGuards(EthereumAuthGuard));
}
