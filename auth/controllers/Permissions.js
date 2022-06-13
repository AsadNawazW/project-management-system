// Load Service Imports
import PermissionService from '../services/PermissionService';

const PermissionServiceObj = new PermissionService();

export const listPermissionsResponse = async (req, res) => {
  await PermissionServiceObj.listPermissions(req, res);
};
export const getPermissionResponse = async (req, res) => {
  await PermissionServiceObj.getPermission(req, res);
};
export const createPermissionResponse = async (req, res) => {
  await PermissionServiceObj.createPermission(req, res);
};
export const updatePermissionResponse = async (req, res) => {
  await PermissionServiceObj.updatePermission(req, res);
};
export const deletePermissionResponse = async (req, res) => {
  await PermissionServiceObj.deletePermission(req, res);
};
