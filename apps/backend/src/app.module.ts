import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
