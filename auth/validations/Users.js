// Load Validation imports
import { check, param } from 'express-validator';

const userIdValidation = param('userId')
  .exists()
  .withMessage('userId parameter not found in the url')
  .bail()
  .isLength({ min: 2, max: 32 })
  .withMessage(
    'userId field must be greater than 2 characters and less than 32 characters',
  )
  .bail();

const firstNameValidation = check('firstName')
  .exists()
  .withMessage('firstName field must be present')
  .bail()
  .isLength({ min: 2, max: 32 })
  .bail();

const lastNameValidation = check('lastName')
  .exists()
  .withMessage('lastName field must be present')
  .bail()
  .isLength({ min: 2, max: 32 })
  .bail();

const emailValidation = check('email')
  .exists()
  .withMessage('email field must be present')
  .bail()
  .isEmail()
  .withMessage('email provided is not a valid email address')
  .bail();

const passwordValidation = check('password')
  .exists()
  .withMessage('password field must be present')
  .bail()
  .isLength({ min: 8, max: 32 })
  .withMessage(
    'password field must be greater than 8 characters and less than 32 characters',
  );
const roleNameValidation = check('role')
  .exists()
  .withMessage('role field is required')
  .bail()
  .isLength({ min: 2, max: 32 })
  .withMessage(
    'role field must be greater than 2 characters and less than 32 characters',
  )
  .bail();

export const accessTokenValidation = check('access_token')
  .exists()
  .withMessage('access_token field must be present')
  .bail();

export const listUsersValidate = [];

export const getUserValidate = [userIdValidation];
export const createUserValidate = [
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  passwordValidation,
];
export const updateUserValidate = [
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  passwordValidation,
];
export const deleteUserValidate = [userIdValidation];
export const addUserRoleValidate = [userIdValidation, roleNameValidation];
