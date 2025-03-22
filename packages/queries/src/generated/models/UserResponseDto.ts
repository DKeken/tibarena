export type UserResponseDto = {
  /**
   * @description User ID
   * @type string
   */
  id: string;
  /**
   * @description Ethereum wallet address
   * @type string
   */
  walletAddress: string;
  /**
   * @description Username
   * @type string | undefined
   */
  username?: string;
  /**
   * @description User profile image URL
   * @type string | undefined
   */
  imageUrl?: string;
};
