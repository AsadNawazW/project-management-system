// Load Validation imports
import { check, param } from "express-validator";

const listRolesValidate = [

]

let roleIdValidation = param('roleId')
.exists()
.withMessage('roleId parameter not found in the url')
.bail()
.isLength({min:2,max:32})
.withMessage('roleId field must be greater than 2 characters and less than 32 characters')
.bail()


let roleNameValidation = check('name')
.exists()
.withMessage('name field is required')
.bail()
.isLength({min:2,max:32})
.withMessage('name field must be greater than 2 characters and less than 32 characters')
.bail()

let permissionArrayValidation = check('permissions','Permissions are required in array format').exists().bail()

const getRoleValidate = [
    roleIdValidation
]
const createRoleValidate = [
    roleNameValidation
]
const updateRoleValidate = [
    roleIdValidation,
    roleNameValidation
]
const deleteRoleValidate = [
    roleIdValidation,
]
const createRolePermissionValidate = [
    roleIdValidation,
    permissionArrayValidation
]
const deleteRolePermissionValidate = [
    roleIdValidation,
    permissionArrayValidation
    
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