export type UpdateUserDto = {
  /**
   * @description Username of the user
   * @minLength 3
   * @maxLength 30
   * @type string | undefined
   */
  username?: string;
  /**
   * @description Email address of the user
   * @type string | undefined
   */
  email?: string;
  /**
   * @description Password of the user (will be hashed)
   * @type string | undefined
   */
  password?: string;
  /**
   * @description Blockchain wallet address of the user
   * @type string | undefined
   */
  walletAddress?: string;
};
