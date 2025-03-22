import {
  IsEthereumAddress,
  IsString,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO for Ethereum wallet login
 */
export class LoginDto {
  @ApiProperty({ description: "Ethereum wallet address" })
  @IsEthereumAddress()
  readonly address!: string;

  @ApiProperty({ description: "Signed message containing the nonce" })
  @IsString()
  @IsNotEmpty()
  readonly signature!: string;

  @ApiProperty({
    description: "The full message that was signed",
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly message?: string;
}
