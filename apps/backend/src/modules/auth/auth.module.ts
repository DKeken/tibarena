import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { EthereumStrategy } from "./strategies/ethereum.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { AuthController } from "./auth.controller";
import { ExampleController } from "./examples/protected-route.example";
import { SimplifiedExampleController } from "./examples/simplified-protected-route.example";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET", "super-secret-key"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRES_IN", "15m"),
        },
      }),
    }),
  ],
  providers: [AuthService, EthereumStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController, ExampleController, SimplifiedExampleController],
})
export class AuthModule {}
