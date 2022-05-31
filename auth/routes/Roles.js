const { validateRequest } = require("../middlewares/Validation");
const {
  getRoleResponse,
  createRoleResponse,
  updateRoleResponse,
  deleteRoleResponse,
  createRolePermissionResponse,
  deleteRolePermissionResponse,
} = require("../controllers/Roles");
const {
  getRoleValidate,
  createRoleValidate,
  updateRoleValidate,
  deleteRoleValidate,
  createRolePermissionValidate,
  deleteRolePermissionValidate,
} = require("../validations/Roles");

module.exports = (app) => {
    
  app.get("/roles", [getRoleValidate, validateRequest], getRoleResponse);
  app.post("/roles", [createRoleValidate, validateRequest], createRoleResponse);
  app.patch(
    "/roles",
    [updateRoleValidate, validateRequest],
    updateRoleResponse
  );
  app.delete(
    "/roles",
    [deleteRoleValidate, validateRequest],
    deleteRoleResponse
  );

  app.post(
    "/roles/:name/permissions",
    [createRolePermissionValidate, validateRequest],
    createRolePermissionResponse
  );
  app.delete(
    "/roles/:name/permissions",
    [deleteRolePermissionValidate, validateRequest],
    deleteRolePermissionResponse
  );

  return app;
};
