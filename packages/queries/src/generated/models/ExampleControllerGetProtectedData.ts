/**
 * @description Successfully retrieved protected data
 */
export type ExampleControllerGetProtectedData200 = {
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
 * @description Unauthorized - Invalid or missing authentication
 */
export type ExampleControllerGetProtectedData401 = any;

export type ExampleControllerGetProtectedDataQueryResponse =
  ExampleControllerGetProtectedData200;

export type ExampleControllerGetProtectedDataQuery = {
  Response: ExampleControllerGetProtectedData200;
  Errors: ExampleControllerGetProtectedData401;
};
