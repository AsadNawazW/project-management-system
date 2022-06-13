// Load Validation imports
import { check, param } from 'express-validator';

const roleIdValidation = param('roleId')
  .exists()
  .withMessage('roleId parameter not found in the url')
  .bail()
  .isLength({ min: 2, max: 32 })
  .withMessage(
    'roleId field must be greater than 2 characters and less than 32 characters',
  )
  .bail();

const roleNameValidation = check('name')
  .exists()
  .withMessage('name field is required')
  .bail()
  .isLength({ min: 2, max: 32 })
  .withMessage(
    'name field must be greater than 2 characters and less than 32 characters',
  )
  .bail();

const permissionArrayValidation = check(
  'permissions',
  'Permissions are required in array format',
)
  .exists()
  .bail();

export const listRolesValidate = [];
export const getRoleValidate = [roleIdValidation];
export const createRoleValidate = [roleNameValidation];
export const updateRoleValidate = [roleIdValidation, roleNameValidation];
export const deleteRoleValidate = [roleIdValidation];
export const createRolePermissionValidate = [
  roleIdValidation,
  permissionArrayValidation,
];
export const deleteRolePermissionValidate = [
  roleIdValidation,
  permissionArrayValidation,
];
