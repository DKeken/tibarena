import { ApiPropertyOptional } from "@nestjs/swagger";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from "class-validator";
import { Transform } from "class-transformer";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: "Username of the user",
    example: "john_doe",
    minLength: 3,
    maxLength: 30,
  })
  @IsString({ message: "Username must be a string" })
  @IsOptional()
  @Length(3, 30, { message: "Username must be between 3 and 30 characters" })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers and underscores",
  })
  @Transform(({ value }) => value?.trim())
  username?: string;

  @ApiPropertyOptional({
    description: "Email address of the user",
    example: "user@example.com",
  })
  @IsEmail({}, { message: "Invalid email format" })
  @IsOptional()
  @Transform(({ value }) => value?.trim().toLowerCase())
  email?: string;

  @ApiPropertyOptional({
    description: "Password of the user (will be hashed)",
    example: "StrongP@ssw0rd",
    writeOnly: true,
  })
  @IsString({ message: "Password must be a string" })
  @IsOptional()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
  })
  password?: string;

  @ApiPropertyOptional({
    description: "Blockchain wallet address of the user",
    example: "0x1234567890abcdef1234567890abcdef12345678",
  })
  @IsString({ message: "Wallet address must be a string" })
  @IsOptional()
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: "Wallet address must be a valid Ethereum address",
  })
  walletAddress?: string;
}
