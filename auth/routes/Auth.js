
const { validateRequest } = require('../middlewares/Validation');
const { registerResponse, loginResponse , refreshTokenResponse } = require('../controllers/Auth');
const { registerValidator, loginValidator , refreshTokenValidator  } = require('../validations/Auth')

module.exports = (app) => {    

    app.post('/login',[loginValidator,validateRequest],loginResponse);
    app.post('/register',[registerValidator,validateRequest],registerResponse);
    //app.post('/refresh-token',[refreshTokenValidator,validateRequest],refreshTokenResponse);
 
    return app;     
};

