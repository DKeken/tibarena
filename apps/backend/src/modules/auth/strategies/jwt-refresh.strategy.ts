import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { JwtPayload } from "./jwt.strategy";

/**
 * JWT Refresh Strategy for validating refresh tokens
 */
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const refreshToken = request?.cookies?.["refresh_token"];
          if (!refreshToken) {
            return null;
          }
          return refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(
        "JWT_REFRESH_SECRET",
        "super-secret-refresh-key",
      ),
      passReqToCallback: true,
    });
  }

  /**
   * Validate the JWT refresh token payload
   * @param req Express request
   * @param payload JWT payload containing user information
   * @returns User object extracted from the token
   */
  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req?.cookies?.["refresh_token"];

    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token not found");
    }

    return {
      id: payload.userId,
      walletAddress: payload.walletAddress,
      username: payload.username,
    };
  }
}
