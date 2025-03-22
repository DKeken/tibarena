import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO for user response
 */
export class UserResponseDto {
  @ApiProperty({
    description: "User ID",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  id: string;

  @ApiProperty({
    description: "Ethereum wallet address",
    example: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  })
  walletAddress: string;

  @ApiProperty({
    description: "Username",
    example: "crypto_enthusiast",
    required: false,
  })
  username?: string;

  @ApiProperty({
    description: "User profile image URL",
    example: "https://example.com/avatar.png",
    required: false,
  })
  imageUrl?: string;

  constructor(partial: Partial<UserResponseDto> = {}) {
    Object.assign(this, partial);
    this.id = partial.id || "";
    this.walletAddress = partial.walletAddress || "";
  }
}
