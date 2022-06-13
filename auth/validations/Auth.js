// Load Validation imports
import { check } from 'express-validator';

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

const accessTokenValidation = check('access_token')
  .exists()
  .withMessage('access_token field must be present')
  .bail();

const roleNameValidation = check('name')
  .exists()
  .withMessage('name field is required to attach roles')
  .bail()
  .isLength({ min: 2, max: 32 })
  .withMessage(
    'name field to specify the role must be greater than 2 characters and less than 32 characters',
  )
  .bail();

export const registerValidator = [
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  passwordValidation,
];

export const loginValidator = [emailValidation, passwordValidation];
export const refreshTokenValidator = [accessTokenValidation, roleNameValidation];
