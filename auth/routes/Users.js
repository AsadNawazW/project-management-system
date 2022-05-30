
const { validateRequest } = require('../middlewares/Validation');
const {    getUserResponse,    createUserResponse,    updateUserResponse,    deleteUserResponse } = require('../controllers/Users');
const {    getUserValidate,    createUserValidate,    updateUserValidate,    deleteUserValidate } = require('../validations/Users');


module.exports = (app) => 
{    
    app.get('/users/:id',[getUserValidate,validateRequest],getUserResponse);
    app.post('/users',[createUserValidate,validateRequest],createUserResponse);    
    app.patch('/users/:id',[updateUserValidate,validateRequest],updateUserResponse);    
    app.delete('/users/:id',[deleteUserValidate,validateRequest],deleteUserResponse);    
   
    return app;     
};

