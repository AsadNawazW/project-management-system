const { validateRequest } = require("../middlewares/Validation");
const {
  listPermissionsResponse,
  createPermissionResponse,
  updatePermissionResponse,
  deletePermissionResponse,
} = require("../controllers/Permissions");
const {
  listPermissionsValidate,
  getPermissionValidate,
  createPermissionValidate,
  updatePermissionValidate,
  deletePermissionValidate,
} = require("../validations/Permissions");

module.exports = (app) => {
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
