// Load Validation imports
const { check } = require('express-validator');


const registerValidator = [        
        check('first_name').exists().bail().isLength({min:2,max:32}).bail(),
        check('last_name').exists().bail().isLength({min:2,max:32}).bail(),
        check('email').exists().bail().isEmail().bail(),
        check('password').exists().bail().isLength({min:8,max:32})
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