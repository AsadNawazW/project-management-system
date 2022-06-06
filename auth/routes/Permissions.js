import { validateRequest } from "../middlewares/Validation";
import { listPermissionsResponse, getPermissionResponse, createPermissionResponse, updatePermissionResponse, deletePermissionResponse } from "../controllers/Permissions";
import { listPermissionsValidate, getPermissionValidate, createPermissionValidate, updatePermissionValidate, deletePermissionValidate } from "../validations/Permissions";

module.exports = (app) => {
  app.get("/permissions/:permissionId", [getPermissionValidate, validateRequest], getPermissionResponse);
  app.get(
    "/permissions",
    [listPermissionsValidate, validateRequest],
    listPermissionsResponse
  );
  
  app.post(
    "/permissions",
    [createPermissionValidate, validateRequest],
    createPermissionResponse
  );
  app.patch(
    "/permissions",
    [updatePermissionValidate, validateRequest],
    updatePermissionResponse
  );
  app.delete(
    "/permissions",
    [deletePermissionValidate, validateRequest],
    deletePermissionResponse
  );

  return app;
};
