export type UsersControllerFindOnePathParams = {
  /**
   * @type string
   */
  id: string;
};

/**
 * @description Return user by id
 */
export type UsersControllerFindOne200 = any;

/**
 * @description User not found
 */
export type UsersControllerFindOne404 = any;

export type UsersControllerFindOneQueryResponse = UsersControllerFindOne200;

export type UsersControllerFindOneQuery = {
  Response: UsersControllerFindOne200;
  PathParams: UsersControllerFindOnePathParams;
  Errors: UsersControllerFindOne404;
};
