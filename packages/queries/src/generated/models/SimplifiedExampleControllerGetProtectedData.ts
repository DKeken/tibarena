/**
 * @description Successfully retrieved protected data
 */
export type SimplifiedExampleControllerGetProtectedData200 = {
  /**
   * @type string | undefined
   */
  message?: string;
  /**
   * @type object | undefined
   */
  user?: {
    /**
     * @type string | undefined
     */
    id?: string;
    /**
     * @type string | undefined
     */
    walletAddress?: string;
    /**
     * @type string | undefined
     */
    username?: string;
  };
};

/**
 * @description Unauthorized - Invalid or missing JWT token
 */
export type SimplifiedExampleControllerGetProtectedData401 = any;

export type SimplifiedExampleControllerGetProtectedDataQueryResponse =
  SimplifiedExampleControllerGetProtectedData200;

export type SimplifiedExampleControllerGetProtectedDataQuery = {
  Response: SimplifiedExampleControllerGetProtectedData200;
  Errors: SimplifiedExampleControllerGetProtectedData401;
};
