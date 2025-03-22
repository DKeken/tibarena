import type { UserResponseDto } from "./UserResponseDto.ts";

export type LoginResponseDto = {
  /**
   * @description Authentication success status
   * @type boolean
   */
  success: boolean;
  /**
   * @description Authenticated user information
   */
  user: UserResponseDto;
};
