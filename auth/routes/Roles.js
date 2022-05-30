
const { validateRequest } = require('../middlewares/Validation');
const {    getRoleResponse,    createRoleResponse,    updateRoleResponse,    deleteRoleResponse } = require('../controllers/Roles');
const {    getRoleValidate,    createRoleValidate,    updateRoleValidate,    deleteRoleValidate } = require('../validations/Roles');


module.exports = (app) => 
{   
     
    app.get('/roles',[getRoleValidate,validateRequest],getRoleResponse);
    app.post('/roles',[createRoleValidate,validateRequest],createRoleResponse);    
    app.patch('/roles/:id',[updateRoleValidate,validateRequest],updateRoleResponse);    
    app.delete('/roles/:id',[deleteRoleValidate,validateRequest],deleteRoleResponse);    
   
    return app;     
};

