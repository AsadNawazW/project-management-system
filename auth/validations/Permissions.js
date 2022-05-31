// Load Validation imports
const { check } = require('express-validator');

const listPermissionsValidate = [

]

const getPermissionValidate = [
    check('name','Permission Name is required').exists().bail().isLength({min:2,max:32}).bail(),
]
const createPermissionValidate = [
    check('name','Permission Name is required').exists().bail().isLength({min:2,max:32}).bail(),
]
const updatePermissionValidate = [
    check('name','Permission Name is required').exists().bail().isLength({min:2,max:32}).bail(),
    check('new_name','New Permission Name is required').exists().bail().isLength({min:2,max:32}).bail(),
]
const deletePermissionValidate = [
    check('name','Permission Name is required').exists().bail().isLength({min:2,max:32}).bail(),
]


module.exports =  {
    listPermissionsValidate,
    getPermissionValidate,
    createPermissionValidate,
    updatePermissionValidate,
    deletePermissionValidate
}; 