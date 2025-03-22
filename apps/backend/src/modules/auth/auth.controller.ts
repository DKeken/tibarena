import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request as NestRequest,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Res,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import {
  GetNonceDto,
  LoginDto,
  NonceResponseDto,
  LoginResponseDto,
  LogoutResponseDto,
} from "./dto";
import {
  LoginResponse,
  NonceResponse,
  LogoutResponse,
} from "./interfaces/auth.interfaces";
import { firstValueFrom } from "rxjs";
import type { Response } from "express";

/**
 * Controller handling authentication-related endpoints
 * Provides functionality for Ethereum wallet-based authentication
 */
@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Generates a nonce for Ethereum wallet authentication
   * @param dto DTO containing the wallet address
   * @returns Object containing the message to be signed
   */
  @Post("nonce")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get nonce for Ethereum wallet authentication" })
  @ApiBody({ type: GetNonceDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Nonce generated successfully",
    type: NonceResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid wallet address",
  })
  async getNonce(@Body() dto: GetNonceDto): Promise<NonceResponse> {
    try {
      const nonce = await firstValueFrom(
        this.authService.generateNonce(dto.address),
      );

      return { success: true, nonce };
    } catch {
      throw new BadRequestException("Failed to generate nonce");
    }
  }

  /**
   * Authenticates user using Ethereum wallet signature
   * @param req Request object containing user data from Passport
   * @returns Object containing authentication status and user data
   */
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("ethereum"))
  @ApiOperation({ summary: "Authenticate using Ethereum wallet signature" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Authentication successful",
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid signature",
  })
  async login(
    @Body() loginDto: LoginDto,
    @NestRequest()
    req: {
      user: {
        address: string;
      };
    },
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponse> {
    // Authenticate user with wallet address
    const user = await firstValueFrom(
      this.authService.authenticateWithWallet(req.user.address),
    );

    // Generate JWT tokens
    const tokens = this.authService.generateTokens(user);

    // Set cookies in the response
    this.authService.setAuthCookies(response, tokens);

    return {
      success: true,
      user: {
        id: user.id,
        walletAddress: user.walletAddress,
        username: user.username,
        imageUrl: user.imageUrl,
      },
    };
  }

  /**
   * Refresh access token using refresh token
   * @param req Request object containing user data from JWT refresh strategy
   * @param response Express response object
   * @returns Object with success status
   */
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt-refresh"))
  @ApiOperation({ summary: "Refresh access token" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Token refreshed successfully",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid refresh token",
  })
  async refreshToken(
    @NestRequest() req: { user: { id: string } },
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await firstValueFrom(
      this.authService.refreshTokens(req.user.id),
    );

    // Set only the new access token
    response.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return { success: true, message: "Access token refreshed successfully" };
  }

  /**
   * Logs out the currently authenticated user
   * @returns Object containing logout status
   */
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Log out the current user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Logout successful",
    type: LogoutResponseDto,
  })
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<LogoutResponse> {
    // Clear authentication cookies
    this.authService.clearAuthCookies(response);

    return {
      success: true,
      message: "Logged out successfully",
    };
  }
}
