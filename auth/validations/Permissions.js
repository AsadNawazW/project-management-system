// Load Validation imports
import { check, param } from 'express-validator';

const permissionIdValidation = param('permissionId')
  .exists()
  .withMessage('permissionId parameter not found in the url')
  .bail()
  .isLength({ min: 2, max: 32 })
  .withMessage(
    'permissionId field must be greater than 2 characters and less than 32 characters',
  )
  .bail();

const permissionNameValidation = check('name')
  .exists()
  .withMessage('name field is required')
  .bail()
  .isLength({ min: 2, max: 32 })
  .withMessage(
    'name field must be greater than 2 characters and less than 32 characters',
  )
  .bail();

export const listPermissionsValidate = [];

export const getPermissionValidate = [permissionIdValidation];
export const createPermissionValidate = [permissionNameValidation];
export const updatePermissionValidate = [
  permissionIdValidation,
  permissionNameValidation,
];
export const deletePermissionValidate = [permissionIdValidation];

