// Load Service Imports
import AuthService from '../services/AuthService';

const AuthServiceObj = new AuthService();

export const registerResponse = async (req, res) => {
  await AuthServiceObj.createUser(req, res);
};

export const loginResponse = async (req, res) => {
  await AuthServiceObj.attemptLogin(req, res);
};
export const refreshTokenResponse = async (req, res) => {
  await AuthServiceObj.refreshTokenResponse(req, res);
};

