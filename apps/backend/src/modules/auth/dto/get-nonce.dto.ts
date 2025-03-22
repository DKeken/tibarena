import { IsEthereumAddress } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO for nonce request
 */
export class GetNonceDto {
  @ApiProperty({ description: "Ethereum wallet address" })
  @IsEthereumAddress()
  readonly address!: string;
}
