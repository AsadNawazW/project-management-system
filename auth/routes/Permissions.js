
const { validateRequest } = require('../middlewares/Validation');
const {    getPermissionResponse,    createPermissionResponse,    updatePermissionResponse,    deletePermissionResponse } = require('../controllers/Permissions');
const {    getPermissionValidate,    createPermissionValidate,    updatePermissionValidate,    deletePermissionValidate } = require('../validations/Permissions');


module.exports = (app) => 
{   
     
    app.get('/permissions',[getPermissionValidate,validateRequest],getPermissionResponse);
    app.post('/permissions',[createPermissionValidate,validateRequest],createPermissionResponse);    
    app.patch('/permissions',[updatePermissionValidate,validateRequest],updatePermissionResponse);    
    app.delete('/permissions',[deletePermissionValidate,validateRequest],deletePermissionResponse);    
    
    return app;     
};

