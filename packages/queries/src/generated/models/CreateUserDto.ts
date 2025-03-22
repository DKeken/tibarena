export type CreateUserDto = {
  /**
   * @description Username of the user
   * @minLength 3
   * @maxLength 30
   * @type string
   */
  username: string;
  /**
   * @description Email address of the user
   * @type string | undefined
   */
  email?: string;
  /**
   * @description Password for email authentication
   * @minLength 8
   * @type string | undefined
   */
  password?: string;
  /**
   * @description Hashed password of the user (auto-generated, don\'t provide it directly)
   * @type string | undefined
   */
  readonly passwordHash?: string;
  /**
   * @description Ethereum wallet address for wallet-based authentication
   * @type string | undefined
   */
  walletAddress?: string;
  /**
   * @description Authentication nonce for the user (auto-generated, don\'t provide it directly)
   * @type string | undefined
   */
  readonly authNonce?: string;
};
