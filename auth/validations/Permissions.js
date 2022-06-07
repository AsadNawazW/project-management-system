// Load Validation imports
import { check, param } from "express-validator";

const listPermissionsValidate = [

]

const getPermissionValidate = [
    param('permissionId','Permission Name is required').exists().bail().isLength({min:2,max:32}).bail(),
]
const createPermissionValidate = [
    check('name','Permission Name is required').exists().bail().isLength({min:2,max:32}).bail(),
]
const updatePermissionValidate = [
    param('permissionId','Permission Name is required').exists().bail().isLength({min:2,max:32}).bail(),
    check('name','Permission Name is required').exists().bail().isLength({min:2,max:32}).bail(),    
]
const deletePermissionValidate = [
    param('permissionId','Permission Name is required').exists().bail().isLength({min:2,max:32}).bail(),
]


module.exports =  {
    listPermissionsValidate,
    getPermissionValidate,
    createPermissionValidate,
    updatePermissionValidate,
    deletePermissionValidate
}; 