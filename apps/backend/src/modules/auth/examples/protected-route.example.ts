import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import type { AuthenticatedUser } from "../interfaces";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

/**
 * Example controller demonstrating how to use the JwtAuthGuard
 * This is just an example and should not be used directly in production
 */
@ApiTags("Authentication Example")
@Controller("example")
export class ExampleController {
  /**
   * Protected route that requires JWT authentication
   * The JwtAuthGuard will validate the JWT token from cookies or Authorization header
   * @param req Request object with authenticated user
   * @returns User information
   */
  @ApiOperation({ summary: "Get protected user data" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved protected data",
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "You have access to this protected resource",
        },
        user: {
          type: "object",
          properties: {
            id: { type: "string", example: "1234567890" },
            walletAddress: {
              type: "string",
              example: "0x1234567890abcdef1234567890abcdef12345678",
            },
            username: { type: "string", example: "user123" },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing authentication",
  })
  @UseGuards(JwtAuthGuard)
  @Get("protected")
  getProtectedData(@Request() req: { user: AuthenticatedUser }) {
    // The user object is attached to the request by the guard
    const user = req.user;

    return {
      message: "You have access to this protected resource",
      user: {
        id: user.id,
        walletAddress: user.walletAddress,
        username: user.username,
      },
    };
  }
}
