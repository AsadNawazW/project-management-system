import { validateRequest } from "../middlewares/Validation";
import { listRolesResponse, getRoleResponse, createRoleResponse, updateRoleResponse, deleteRoleResponse, createRolePermissionResponse, deleteRolePermissionResponse } from "../controllers/Roles";
import { listRolesValidate, getRoleValidate, createRoleValidate, updateRoleValidate, deleteRoleValidate, createRolePermissionValidate, deleteRolePermissionValidate } from "../validations/Roles";

module.exports = (app) => {

  app.get("/roles", [listRolesValidate, validateRequest], listRolesResponse);
  app.get("/roles/:roleId", [getRoleValidate, validateRequest], getRoleResponse);
  app.post("/roles", [createRoleValidate, validateRequest], createRoleResponse);
  app.patch(
    "/roles/:roleId",
    [updateRoleValidate, validateRequest],
    updateRoleResponse
  );
  app.delete(
    "/roles/:roleId",
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
