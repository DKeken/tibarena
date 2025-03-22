import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO for logout response
 */
export class LogoutResponseDto {
  @ApiProperty({
    description: "Indicates if the logout was successful",
    example: true,
  })
  success!: boolean;

  @ApiProperty({
    description: "Message describing the result of the logout operation",
    example: "Logged out successfully",
  })
  message!: string;
}
