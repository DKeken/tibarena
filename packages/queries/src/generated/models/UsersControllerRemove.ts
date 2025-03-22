export type UsersControllerRemovePathParams = {
  /**
   * @type string
   */
  id: string;
};

/**
 * @description User successfully deleted
 */
export type UsersControllerRemove200 = any;

/**
 * @description User not found
 */
export type UsersControllerRemove404 = any;

export type UsersControllerRemoveMutationResponse = UsersControllerRemove200;

export type UsersControllerRemoveMutation = {
  Response: UsersControllerRemove200;
  PathParams: UsersControllerRemovePathParams;
  Errors: UsersControllerRemove404;
};
