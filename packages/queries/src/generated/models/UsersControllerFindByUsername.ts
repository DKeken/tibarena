export type UsersControllerFindByUsernamePathParams = {
  /**
   * @type string
   */
  username: string;
};

/**
 * @description Return user by username
 */
export type UsersControllerFindByUsername200 = any;

/**
 * @description User not found
 */
export type UsersControllerFindByUsername404 = any;

export type UsersControllerFindByUsernameQueryResponse =
  UsersControllerFindByUsername200;

export type UsersControllerFindByUsernameQuery = {
  Response: UsersControllerFindByUsername200;
  PathParams: UsersControllerFindByUsernamePathParams;
  Errors: UsersControllerFindByUsername404;
};
