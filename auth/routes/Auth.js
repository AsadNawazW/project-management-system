import validateRequest from '../middlewares/Validation';
import { registerResponse, loginResponse } from '../controllers/Auth';
import { registerValidator, loginValidator } from '../validations/Auth';

module.exports = (app) => {
  app.post('/login', [loginValidator, validateRequest], loginResponse);
  app.post('/register', [registerValidator, validateRequest], registerResponse);  

  return app;
};
