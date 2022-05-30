
// Load Service Imports
const UserService = require("../services/UserService");

let UserServiceObj = new UserService;

const getUserResponse = async (req, res) => {
    await UserServiceObj.getUser(req,res)
}
const createUserResponse = async (req, res) => {
    await UserServiceObj.createUser(req,res)
}
const updateUserResponse = async (req, res) => {
    await UserServiceObj.updateUser(req,res)
}
const deleteUserResponse = async (req, res) => {
    await UserServiceObj.deleteUser(req,res)
}

module.exports =  {
    getUserResponse,
    createUserResponse,
    updateUserResponse,
    deleteUserResponse
};

