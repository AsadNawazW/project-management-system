// Load Validation imports
import { check, param } from "express-validator";

const listRolesValidate = [

]

const getRoleValidate = [
    param('roleId','Role ID is required').exists().bail().isLength({min:2,max:32}).bail(),
]
const createRoleValidate = [
    check('name','Role Name is required').exists().bail().isLength({min:2,max:32}).bail(),
]
const updateRoleValidate = [
    check('name','Role Name is required').exists().bail().isLength({min:2,max:32}).bail(),
    check('new_name','New Role Name is required').exists().bail().isLength({min:2,max:32}).bail(),
]
const deleteRoleValidate = [
    check('name','Role Name is required').exists().bail().isLength({min:2,max:32}).bail(),
]

const createRolePermissionValidate = [
    param('name','Role Name is required').exists().bail().isLength({min:2,max:32}).bail(),
    check('permissions','Permissions are required in array format').exists().bail(),
]
const deleteRolePermissionValidate = [
    param('name','Role Name is required').exists().bail().isLength({min:2,max:32}).bail(),
    check('permissions','Permissions are required in array format').exists().bail(),
]



module.exports =  {
    listRolesValidate,
    getRoleValidate,
    createRoleValidate,
    updateRoleValidate,
    deleteRoleValidate,
    createRolePermissionValidate,
    deleteRolePermissionValidate
}; 