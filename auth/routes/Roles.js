import { validateRequest } from "../middlewares/Validation";
import { validateAuth } from "../middlewares/Auth";
import { listRolesResponse, getRoleResponse, createRoleResponse, updateRoleResponse, deleteRoleResponse, createRolePermissionResponse, deleteRolePermissionResponse } from "../controllers/Roles";
import { listRolesValidate, getRoleValidate, createRoleValidate, updateRoleValidate, deleteRoleValidate, createRolePermissionValidate, deleteRolePermissionValidate } from "../validations/Roles";

module.exports = (app) => {

  app.get("/roles", [validateAuth('roles.index'),listRolesValidate, validateRequest], listRolesResponse);
  app.get("/roles/:roleId", [validateAuth('roles.get'),getRoleValidate, validateRequest], getRoleResponse);
  app.post("/roles", [validateAuth('roles.create'),createRoleValidate, validateRequest], createRoleResponse);
  app.patch(
    "/roles/:roleId",
    [validateAuth('roles.update'),updateRoleValidate, validateRequest],
    updateRoleResponse
  );
  app.delete(
    "/roles/:roleId",
    [validateAuth('roles.delete'),deleteRoleValidate, validateRequest],
    deleteRoleResponse
  );

  app.post(
    "/roles/:roleId/permissions",
    [validateAuth('roles.update'),createRolePermissionValidate, validateRequest],
    createRolePermissionResponse
  );
  app.delete(
    "/roles/:roleId/permissions",
    [validateAuth('roles.update'),deleteRolePermissionValidate, validateRequest],
    deleteRolePermissionResponse
  );

  return app;
};
