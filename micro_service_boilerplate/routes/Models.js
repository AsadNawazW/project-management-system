import validateRequest from '../middlewares/Validation';
import validateAuth from '../middlewares/Auth';
import {
  listModelsResponse,
  getModelResponse,
  createModelResponse,
  updateModelResponse,
  deleteModelResponse,
} from '../controllers/Models';
import {
  listModelsValidate,
  getModelValidate,
  createModelValidate,
  updateModelValidate,
  deleteModelValidate,
} from '../validations/Models';

module.exports = (app) => {
  app.get(
    '/models/:modelId',
    [validateAuth('models.index'), getModelValidate, validateRequest],
    getModelResponse,
  );
  app.get(
    '/models',
    [validateAuth('models.get'), listModelsValidate, validateRequest],
    listModelsResponse,
  );

  app.post(
    '/models',
    [
      validateAuth('models.create'),
      createModelValidate,
      validateRequest,
    ],
    createModelResponse,
  );
  app.patch(
    '/models/:modelId',
    [
      validateAuth('models.update'),
      updateModelValidate,
      validateRequest,
    ],
    updateModelResponse,
  );
  app.delete(
    '/models/:modelId',
    [
      validateAuth('models.delete'),
      deleteModelValidate,
      validateRequest,
    ],
    deleteModelResponse,
  );

  return app;
};
