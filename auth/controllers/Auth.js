// Load Service Imports
import AuthService from '../services/AuthService';

const AuthServiceObj = new AuthService();

const registerResponse = async (req, res) => {
  await AuthServiceObj.createUser(req, res);
};

const loginResponse = async (req, res) => {
  await AuthServiceObj.attemptLogin(req, res);
};
const refreshTokenResponse = async (req, res) => {
  await AuthServiceObj.refreshTokenResponse(req, res);
};

module.exports = {
  registerResponse,
  loginResponse,
  refreshTokenResponse,
};
