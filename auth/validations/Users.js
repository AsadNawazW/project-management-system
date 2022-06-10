// Load Validation imports
import { check, param } from "express-validator";

let permissionIdValidation = param('permissionId')
.exists()
.withMessage('permissionId parameter not found in the url')
.bail()
.isLength({min:2,max:32})
.withMessage('permissionId field must be greater than 2 characters and less than 32 characters')
.bail()

let firstNameValidation = check('first_name')
.exists()
.withMessage('first_name field must be present')
.bail()
.isLength({min:2,max:32})
.bail()

let lastNameValidation = check('last_name')
.exists()
.withMessage('last_name field must be present')
.bail()
.isLength({min:2,max:32})
.bail()

let emailValidation = check('email')
.exists()
.withMessage('email field must be present')
.bail()
.isEmail()
.withMessage('email provided is not a valid email address')
.bail()

let passwordValidation = check('password')
.exists()
.withMessage('password field must be present')
.bail()
.isLength({min:8,max:32})
.withMessage('password field must be greater than 8 characters and less than 32 characters')

let accessTokenValidation =     check('access_token')
.exists()
.withMessage('access_token field must be present')
.bail() 

const listUsersValidate = [

]

const getUserValidate = [
    param('userId','User ID is required').exists().bail()
]
const createUserValidate = [
    firstNameValidation,
    lastNameValidation,
    emailValidation,
    passwordValidation
]
const updateUserValidate = [
    firstNameValidation,
    lastNameValidation,
    emailValidation,
    passwordValidation
]
const deleteUserValidate = [
    param('userId','User ID is required').exists().bail()
]
const addUserRoleValidate = [
    param('userId','User ID is required').exists().bail(),
    check('role','Role name is required!').exists().bail().isLength({min:2,max:32}).bail(),
]


module.exports =  {
    listUsersValidate,
    getUserValidate,
    createUserValidate,
    updateUserValidate,
    deleteUserValidate,
    addUserRoleValidate
}; 