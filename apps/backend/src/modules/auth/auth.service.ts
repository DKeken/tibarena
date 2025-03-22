import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { randomBytes } from "crypto";
import { verifyMessage } from "viem";
import { Observable, from, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { db } from "@repo/database/db";
import { authMessages, AuthMessageStatus } from "@repo/database/schema";
import { eq } from "@repo/database";
import { handleDatabaseError } from "@/common/utils/rxjs-error-handlers";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { Response } from "express";

/**
 * Service handling authentication-related operations
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Generates a new nonce for wallet authentication
   * @param address Wallet address
   * @returns Observable containing the generated nonce
   */
  generateNonce(address: string): Observable<string> {
    const nonce = randomBytes(16).toString("hex");
    const normalizedAddress = address.toLowerCase();

    return from(
      db
        .insert(authMessages)
        .values({
          walletAddress: normalizedAddress,
          status: AuthMessageStatus.PENDING,
        })
        .returning(),
    ).pipe(
      map(() => nonce),
      handleDatabaseError("create", "auth message"),
    );
  }

  /**
   * Retrieves the latest nonce for a wallet address
   * @param address Wallet address
   * @returns Observable containing the nonce
   * @throws BadRequestException if nonce not found
   */
  getNonce(address: string): Observable<string> {
    const normalizedAddress = address.toLowerCase();

    return from(
      db
        .select()
        .from(authMessages)
        .where(eq(authMessages.walletAddress, normalizedAddress))
        .orderBy(authMessages.createdAt)
        .limit(1),
    ).pipe(
      map((messages) => {
        const message = messages[0];
        if (!message?.id) {
          throw new BadRequestException(
            "Nonce not found for the provided address",
          );
        }
        return message.id;
      }),
      handleDatabaseError("find", "auth message"),
    );
  }

  /**
   * Verifies a message signature against a wallet address
   * @param address Ethereum wallet address
   * @param signature Message signature
   * @param message Original message that was signed
   * @returns Observable containing the verification result
   */
  verifySignature(
    address: `0x${string}`,
    signature: `0x${string}`,
    message: string,
  ): Observable<boolean> {
    console.log("Verifying signature:", {
      address,
      signature: signature.slice(0, 10) + "...",
      message,
    });

    return from(verifyMessage({ address, signature, message })).pipe(
      map((isValid) => {
        console.log("Signature verification result:", isValid);
        return isValid;
      }),
      catchError((error) => {
        console.error("Error verifying signature:", error);
        return of(false);
      }),
    );
  }

  /**
   * Authenticate a user with their wallet address
   * @param walletAddress User's Ethereum wallet address
   * @returns Observable containing the user data
   */
  authenticateWithWallet(walletAddress: string): Observable<any> {
    return this.usersService.findOrCreateByWalletAddress(walletAddress);
  }

  /**
   * Generate access and refresh tokens for a user
   * @param user User to generate tokens for
   * @returns Object containing access and refresh tokens
   */
  generateTokens(user: any): { accessToken: string; refreshToken: string } {
    const payload = {
      userId: user.id,
      walletAddress: user.walletAddress,
      username: user.username,
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_SECRET", "super-secret-key"),
      expiresIn: this.configService.get<string>("JWT_EXPIRES_IN", "15m"),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>(
        "JWT_REFRESH_SECRET",
        "super-secret-refresh-key",
      ),
      expiresIn: this.configService.get<string>("JWT_REFRESH_IN", "7d"),
    });

    return { accessToken, refreshToken };
  }

  /**
   * Set authentication cookies in the response
   * @param response Express response object
   * @param tokens Access and refresh tokens
   */
  setAuthCookies(
    response: Response,
    tokens: { accessToken: string; refreshToken: string },
  ): void {
    // Set access token cookie (short-lived)
    response.cookie("access_token", tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Set refresh token cookie (long-lived)
    response.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  /**
   * Clear authentication cookies from the response
   * @param response Express response object
   */
  clearAuthCookies(response: Response): void {
    response.clearCookie("access_token");
    response.clearCookie("refresh_token");
  }

  /**
   * Refresh access token using refresh token
   * @param userId User ID from the refresh token
   * @returns Observable with new access token
   */
  refreshTokens(userId: string): Observable<{ accessToken: string }> {
    return this.usersService.findOne(userId).pipe(
      map((user) => {
        const tokens = this.generateTokens(user);
        return { accessToken: tokens.accessToken };
      }),
      catchError(() => {
        throw new UnauthorizedException("Invalid refresh token");
      }),
    );
  }
}
