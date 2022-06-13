// Load Service Imports
import UserService from '../services/UserService';

const UserServiceObj = new UserService();

export const listUsersResponse = async (req, res) => {
  await UserServiceObj.listUsers(req, res);
};
export const getUserResponse = async (req, res) => {
  await UserServiceObj.getUser(req, res);
};
export const createUserResponse = async (req, res) => {
  await UserServiceObj.createUser(req, res);
};
export const updateUserResponse = async (req, res) => {
  await UserServiceObj.updateUser(req, res);
};
export const deleteUserResponse = async (req, res) => {
  await UserServiceObj.deleteUser(req, res);
};
export const addUserRoleResponse = async (req, res) => {
  await UserServiceObj.addUserRole(req, res);
};
