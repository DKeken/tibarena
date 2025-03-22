import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

/**
 * Guard that protects routes requiring Ethereum wallet authentication
 * Uses the 'ethereum' passport strategy defined in EthereumStrategy
 */
@Injectable()
export class EthereumAuthGuard extends AuthGuard("ethereum") {
  /**
   * Determines if the current request is allowed to proceed
   * @param context Current execution context
   * @returns Boolean indicating if the request is authorized
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Delegate to the underlying AuthGuard
    return super.canActivate(context);
  }

  /**
   * Handles the result of authentication and attaches user to request
   * @param err Error that occurred during authentication, if any
   * @param user User object returned from the strategy
   * @param info Additional info from the strategy
   * @param context Current execution context
   * @param status Status of the authentication
   * @returns The user object
   */
  handleRequest<TUser = Record<string, unknown>>(
    err: Error | null,
    user: TUser | false,
  ): TUser {
    if (err || !user) {
      throw err || new Error("Unauthorized");
    }

    return user as TUser;
  }
}
