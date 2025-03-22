import { ApiProperty } from "@nestjs/swagger";
import { NonceResponse } from "../interfaces/auth.interfaces";

/**
 * DTO for nonce response
 */
export class NonceResponseDto implements NonceResponse {
  @ApiProperty({
    description: "Indicates if the logout was successful",
    example: true,
  })
  success!: boolean;

  @ApiProperty({
    description: "Nonce to be signed",
    example: "123456789",
  })
  nonce: string;

  constructor(partial: Partial<NonceResponseDto> = {}) {
    Object.assign(this, partial);
    this.nonce = partial.nonce || "";
  }
}
