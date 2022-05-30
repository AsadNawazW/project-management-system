// Load Validation imports
const { check } = require('express-validator');

const getRoleValidate = [

]
const createRoleValidate = [
    check('name','Role Name is required').exists().bail().isLength({min:2,max:32}).bail(),
]
const updateRoleValidate = [

]
const deleteRoleValidate = [

]


module.exports =  {
    getRoleValidate,
    createRoleValidate,
    updateRoleValidate,
    deleteRoleValidate
}; 