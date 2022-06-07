// Load Validation imports
import { check, param } from "express-validator";

const listUsersValidate = [

]

const getUserValidate = [
    param('userId','User ID is required').exists().bail()
]
const createUserValidate = [
    check('first_name','First Name is required').exists().bail().isLength({min:2,max:32}).bail(),
    check('last_name','Last name is required!').exists().bail().isLength({min:2,max:32}).bail(),
    check('email','Email is required').exists().bail().isEmail().bail(),
    check('password','Password is required').exists().bail().isLength({min:8,max:32})
]
const updateUserValidate = [
    param('userId','User ID is required').exists().bail(),
    check('first_name','First Name is required').optional().isLength({min:2,max:32}).bail(),
    check('last_name','Last name is required!').optional().isLength({min:2,max:32}).bail(),
    check('email','Email is required').exists().bail().isEmail().bail(),
    check('password','Password is required').optional().isLength({min:8,max:32})
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