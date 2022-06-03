import { validateRequest } from "../middlewares/Validation";
import { registerResponse, loginResponse, refreshTokenResponse } from "../controllers/Auth";
import { registerValidator, loginValidator, refreshTokenValidator } from "../validations/Auth";

module.exports = (app) => {
  app.post("/login", [loginValidator, validateRequest], loginResponse);
  app.post("/register", [registerValidator, validateRequest], registerResponse);
  //app.post('/refresh-token',[refreshTokenValidator,validateRequest],refreshTokenResponse);

  return app;
};
