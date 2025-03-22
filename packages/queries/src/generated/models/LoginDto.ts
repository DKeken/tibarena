export type LoginDto = {
  /**
   * @description Ethereum wallet address
   * @type string
   */
  address: string;
  /**
   * @description Signed message containing the nonce
   * @type string
   */
  signature: string;
  /**
   * @description The full message that was signed
   * @type string | undefined
   */
  message?: string;
};
