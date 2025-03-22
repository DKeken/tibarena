import { ApiProperty } from "@nestjs/swagger";
import { LoginResponse } from "../interfaces/auth.interfaces";
import { UserResponseDto } from "./user-response.dto";

/**
 * DTO for login response
 */
export class LoginResponseDto implements LoginResponse {
  @ApiProperty({ description: "Authentication success status", example: true })
  success: boolean;

  @ApiProperty({
    description: "Authenticated user information",
    type: UserResponseDto,
  })
  user: UserResponseDto;

  constructor(partial: Partial<LoginResponseDto> = {}) {
    Object.assign(this, partial);
    this.success = partial.success ?? true;
    this.user = new UserResponseDto(partial.user);
  }
}
