const { validateRequest } = require("../middlewares/Validation");
const {
  getUserResponse,
  listUsersResponse,
  createUserResponse,
  updateUserResponse,
  deleteUserResponse,
} = require("../controllers/Users");
const {
  getUserValidate,
  listUsersValidate,
  createUserValidate,
  updateUserValidate,
  deleteUserValidate,
} = require("../validations/Users"); 

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
