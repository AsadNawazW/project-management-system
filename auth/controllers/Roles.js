// Load Service Imports
import RoleService from '../services/RoleService';

const RoleServiceObj = new RoleService();

export const listRolesResponse = async (req, res) => {
  await RoleServiceObj.listRoles(req, res);
};
export const getRoleResponse = async (req, res) => {
  await RoleServiceObj.getRole(req, res);
};
export const createRoleResponse = async (req, res) => {
  await RoleServiceObj.createRole(req, res);
};
export const updateRoleResponse = async (req, res) => {
  await RoleServiceObj.updateRole(req, res);
};
export const deleteRoleResponse = async (req, res) => {
  await RoleServiceObj.deleteRole(req, res);
};
export const createRolePermissionResponse = async (req, res) => {
  await RoleServiceObj.createRolePermission(req, res);
};
export const deleteRolePermissionResponse = async (req, res) => {
  await RoleServiceObj.deleteRolePermission(req, res);
};
