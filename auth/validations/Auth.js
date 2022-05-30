// Load Validation imports
const { check } = require('express-validator');


const registerValidator = [        
        check('first_name','First Name is required').exists().bail().isLength({min:2,max:32}).bail(),
        check('last_name','Last name is required!').exists().bail().isLength({min:2,max:32}).bail(),
        check('email','Email is required').exists().bail().isEmail().bail(),
        check('password','Password is required').exists().bail().isLength({min:8,max:32})
]

const loginValidator = [

]
const refreshTokenValidator = [

]

module.exports =  {
    registerValidator,
    loginValidator,
    refreshTokenValidator
}; 