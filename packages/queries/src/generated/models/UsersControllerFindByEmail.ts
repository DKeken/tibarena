export type UsersControllerFindByEmailPathParams = {
  /**
   * @type string
   */
  email: string;
};

/**
 * @description Return user by email
 */
export type UsersControllerFindByEmail200 = any;

/**
 * @description User not found
 */
export type UsersControllerFindByEmail404 = any;

export type UsersControllerFindByEmailQueryResponse =
  UsersControllerFindByEmail200;

export type UsersControllerFindByEmailQuery = {
  Response: UsersControllerFindByEmail200;
  PathParams: UsersControllerFindByEmailPathParams;
  Errors: UsersControllerFindByEmail404;
};
