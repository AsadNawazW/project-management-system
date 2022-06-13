// Load Validation imports
import { check, param } from 'express-validator';

const modelIdValidation = param('modelId')
  .exists()
  .withMessage('modelId parameter not found in the url')
  .bail()
  .isLength({ min: 2, max: 32 })
  .withMessage(
    'modelId field must be greater than 2 characters and less than 32 characters',
  )
  .bail();

const modelNameValidation = check('name')
  .exists()
  .withMessage('name field is required')
  .bail()
  .isLength({ min: 2, max: 32 })
  .withMessage(
    'name field must be greater than 2 characters and less than 32 characters',
  )
  .bail();

export const listModelsValidate = [];

export const getModelValidate = [modelIdValidation];
export const createModelValidate = [modelNameValidation];
export const updateModelValidate = [
  modelIdValidation,
  modelNameValidation,
];
export const deleteModelValidate = [modelIdValidation];

