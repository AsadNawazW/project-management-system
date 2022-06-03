// Load Validation imports
import { check } from "express-validator";


const registerValidator = [        
        check('first_name','First Name is required').exists().bail().isLength({min:2,max:32}).bail(),
        check('last_name','Last name is required!').exists().bail().isLength({min:2,max:32}).bail(),
        check('email','Email is required').exists().bail().isEmail().bail(),
        check('password','Password is required').exists().bail().isLength({min:8,max:32})
]

const loginValidator = [
    check('email','Email is required').exists().bail().isEmail().bail(),
    check('password','Password is required').exists().bail().isLength({min:8,max:32})
]
const refreshTokenValidator = [
    check('access_token','Refresh token is required').exists().bail().isLength({min:8,max:32})    
]

module.exports =  {
    registerValidator,
    loginValidator,
    refreshTokenValidator
}; 