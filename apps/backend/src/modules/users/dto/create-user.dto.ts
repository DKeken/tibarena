import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Length,
  Matches,
  MinLength,
  IsEnum,
  ValidateIf,
} from "class-validator";
import { Transform } from "class-transformer";
import { User } from "@repo/database/schema";

export class CreateUserDto implements Partial<User> {
  @ApiProperty({
    description: "Username of the user",
    example: "john_doe",
    minLength: 3,
    maxLength: 30,
  })
  @IsString({ message: "Username must be a string" })
  @IsNotEmpty({ message: "Username is required" })
  @Length(3, 30, { message: "Username must be between 3 and 30 characters" })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers and underscores",
  })
  @Transform(({ value }) => value?.trim())
  username!: string;

  @ApiProperty({
    description: "Email address of the user",
    example: "john.doe@example.com",
    required: false,
  })
  @ValidateIf((o) => !o.walletAddress)
  @IsNotEmpty({ message: "Either email or wallet address is required" })
  @IsEmail({}, { message: "Invalid email format" })
  @Transform(({ value }) => value?.trim().toLowerCase())
  email?: string;

  @ApiProperty({
    description: "Password for email authentication",
    example: "StrongP@ss123",
    required: false,
    minLength: 8,
  })
  @ValidateIf((o) => !o.walletAddress)
  @IsNotEmpty({
    message: "Password is required when using email authentication",
  })
  @IsString({ message: "Password must be a string" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
  })
  password?: string;

  @ApiProperty({
    description:
      "Hashed password of the user (auto-generated, don't provide it directly)",
    example: "$2b$10$abcdefghijklmnopqrstuvwxyz123456789",
    readOnly: true,
    required: false,
  })
  passwordHash?: string;

  @ApiProperty({
    description: "Ethereum wallet address for wallet-based authentication",
    example: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    required: false,
  })
  @ValidateIf((o) => !o.email && !o.password)
  @IsNotEmpty({
    message: "Wallet address is required when not using email authentication",
  })
  @IsString({ message: "Wallet address must be a string" })
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: "Wallet address must be a valid Ethereum address",
  })
  walletAddress?: string;

  @ApiPropertyOptional({
    description:
      "Authentication nonce for the user (auto-generated, don't provide it directly)",
    example: "a1b2c3d4e5f6",
    readOnly: true,
  })
  @IsString({ message: "Auth nonce must be a string" })
  @IsOptional()
  authNonce?: string;
}
