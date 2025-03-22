import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * JWT Authentication Guard to protect routes
 * Use this guard to require authentication for routes
 * Works with both bearer tokens and cookies
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
