import { validateRequest } from "../middlewares/Validation";
import { getUserResponse, listUsersResponse, createUserResponse, updateUserResponse, deleteUserResponse } from "../controllers/Users";
import { getUserValidate, listUsersValidate, createUserValidate, updateUserValidate, deleteUserValidate } from "../validations/Users";

module.exports = (app) => {
  app.get("/users", [listUsersValidate, validateRequest], listUsersResponse);
  app.get("/users/:userId", [getUserValidate, validateRequest], getUserResponse);
  app.post("/users", [createUserValidate, validateRequest], createUserResponse);
  app.patch(
    "/users",
    [updateUserValidate, validateRequest],
    updateUserResponse
  );
  app.delete(
    "/users",
    [deleteUserValidate, validateRequest],
    deleteUserResponse
  );

  return app;
};
