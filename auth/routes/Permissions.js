import { validateRequest } from '../middlewares/Validation';
import { validateAuth } from '../middlewares/Auth';
import {
  listPermissionsResponse, getPermissionResponse, createPermissionResponse, updatePermissionResponse, deletePermissionResponse,
} from '../controllers/Permissions';
import {
  listPermissionsValidate, getPermissionValidate, createPermissionValidate, updatePermissionValidate, deletePermissionValidate,
} from '../validations/Permissions';

module.exports = (app) => {
  app.get('/permissions/:permissionId', [validateAuth('permissions.index'), getPermissionValidate, validateRequest], getPermissionResponse);
  app.get(
    '/permissions',
    [validateAuth('permissions.get'), listPermissionsValidate, validateRequest],
    listPermissionsResponse,
  );

  app.post(
    '/permissions',
    [validateAuth('permissions.create'), createPermissionValidate, validateRequest],
    createPermissionResponse,
  );
  app.patch(
    '/permissions/:permissionId',
    [validateAuth('permissions.update'), updatePermissionValidate, validateRequest],
    updatePermissionResponse,
  );
  app.delete(
    '/permissions/:permissionId',
    [validateAuth('permissions.delete'), deletePermissionValidate, validateRequest],
    deletePermissionResponse,
  );

  return app;
};
