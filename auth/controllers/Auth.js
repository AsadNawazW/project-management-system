
// Load Service Imports
const UserService = require("../services/UserService");

let UserServiceObj = new UserService;

const registerResponse = async (req, res) => {
    return res.send(await UserServiceObj.createUser(req,res))
}

const loginResponse = async (req, res) => {
    return res.send(await UserServiceObj.attemptLogin(req,res))
}
const refreshTokenResponse = async (req, res) => {
    return res.send(await UserServiceObj.refreshTokenResponse(req,res))
}


module.exports =  {
    registerResponse,
    loginResponse,
    refreshTokenResponse
};

// app.post('/register',
// [        
//     check('first_name').exists().bail().isLength({min:2,max:32}).bail(),
//     check('last_name').exists().bail().isLength({min:2,max:32}).bail(),
//     check('email').exists().bail().isEmail().bail(),
//     check('password').exists().bail().isLength({min:8,max:32})
// ],
// async  (req, res) => { 
    
//     var err = validationResult(req)        

//     if (err) {
//         res.status(400).send(err);
//     }      

//     return res.send(await UserServiceObj.createUser(req,res))
// });