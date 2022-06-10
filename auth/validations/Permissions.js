// Load Validation imports
import { check, param } from "express-validator";


let permissionIdValidation = param('permissionId')
.exists()
.withMessage('permissionId parameter not found in the url')
.bail()
.isLength({min:2,max:32})
.withMessage('permissionId field must be greater than 2 characters and less than 32 characters')
.bail()


let permissionNameValidation = check('name')
.exists()
.withMessage('name field is required')
.bail()
.isLength({min:2,max:32})
.withMessage('name field must be greater than 2 characters and less than 32 characters')
.bail()

const listPermissionsValidate = [

]

const getPermissionValidate = [
    permissionIdValidation
]
const createPermissionValidate = [
    permissionNameValidation
]
const updatePermissionValidate = [
    permissionIdValidation,
    permissionNameValidation    
]
const deletePermissionValidate = [
    permissionIdValidation
]


module.exports =  {
    listPermissionsValidate,
    getPermissionValidate,
    createPermissionValidate,
    updatePermissionValidate,
    deletePermissionValidate
}; 