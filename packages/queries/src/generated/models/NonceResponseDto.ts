export type NonceResponseDto = {
  /**
   * @description Indicates if the logout was successful
   * @type boolean
   */
  success: boolean;
  /**
   * @description Nonce to be signed
   * @type string
   */
  nonce: string;
};
