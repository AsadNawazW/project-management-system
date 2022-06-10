// Load Validation imports
import { check } from "express-validator";

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

let accessTokenValidation =  check('access_token')
.exists()
.withMessage('access_token field must be present')
.bail() 

let roleNameValidation = check('name')
.exists()
.withMessage('name field is required to attach roles')
.bail()
.isLength({min:2,max:32})
.withMessage('name field to specify the role must be greater than 2 characters and less than 32 characters')
.bail()


const registerValidator = [        
    firstNameValidation,
    lastNameValidation,
    emailValidation,
    passwordValidation
]

const loginValidator = [
    emailValidation,
    passwordValidation
]
const refreshTokenValidator = [
    accessTokenValidation,
    roleNameValidation
]

module.exports =  {
    registerValidator,
    loginValidator,
    refreshTokenValidator
}; 