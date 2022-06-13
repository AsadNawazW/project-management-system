import validateRequest from '../middlewares/Validation';
import validateAuth from '../middlewares/Auth';
import {
  getUserResponse,
  listUsersResponse,
  createUserResponse,
  updateUserResponse,
  deleteUserResponse,
  addUserRoleResponse,
} from '../controllers/Users';
import {
  getUserValidate,
  listUsersValidate,
  createUserValidate,
  updateUserValidate,
  deleteUserValidate,
  addUserRoleValidate,
} from '../validations/Users';

module.exports = (app) => {
  app.get(
    '/users',
    [validateAuth('users.index'), listUsersValidate, validateRequest],
    listUsersResponse,
  );
  app.get(
    '/users/:userId',
    [validateAuth('users.get'), getUserValidate, validateRequest],
    getUserResponse,
  );
  app.post(
    '/users',
    [validateAuth('users.create'), createUserValidate, validateRequest],
    createUserResponse,
  );
  app.patch(
    '/users/:userId',
    [validateAuth('users.update'), updateUserValidate, validateRequest],
    updateUserResponse,
  );
  app.delete(
    '/users/:userId',
    [validateAuth('users.delete'), deleteUserValidate, validateRequest],
    deleteUserResponse,
  );
  app.post(
    '/users/:userId/role',
    [validateAuth('users.role'), addUserRoleValidate, validateRequest],
    addUserRoleResponse,
  );

  return app;
};
