import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthenticatedUser } from "../interfaces";

/**
 * Parameter decorator to extract the authenticated Ethereum user from the request
 *
 * @example
 * ```typescript
 * @EthereumAuth()
 * @Get('profile')
 * getProfile(@EthereumUser() user: AuthenticatedUser) {
 *   return user;
 * }
 * ```
 */
export const EthereumUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
