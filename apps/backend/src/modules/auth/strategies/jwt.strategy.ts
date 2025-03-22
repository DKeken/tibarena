import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

/**
 * JWT payload interface
 */
export interface JwtPayload {
  userId: string;
  walletAddress: string;
  username?: string;
  sub: string;
}

/**
 * JWT Strategy for validating access tokens
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => {
          const accessToken = request?.cookies?.["access_token"];
          if (!accessToken) {
            return null;
          }
          return accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET", "super-secret-key"),
    });
  }

  /**
   * Validate the JWT payload
   * @param payload JWT payload containing user information
   * @returns User object extracted from the token
   */
  async validate(payload: JwtPayload) {
    return {
      id: payload.userId,
      walletAddress: payload.walletAddress,
      username: payload.username,
    };
  }
}
