
// Load Service Imports
import UserService from "../services/UserService";

let UserServiceObj = new UserService;

const listUsersResponse = async (req, res) => {
    await UserServiceObj.listUsers(req,res)
}
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
    listUsersResponse,
    getUserResponse,
    createUserResponse,
    updateUserResponse,
    deleteUserResponse
};

