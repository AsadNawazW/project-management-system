// Global Imports
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Local Imports

import BaseService from './BaseService';
import User from '../models/User';
import UserService from './UserService';
import RoleService from './RoleService';
import AuthEvents from '../events/AuthEvents';

class AuthService extends BaseService {
  constructor() {
    super();
    this.User = User;
    this.UserService = new UserService();
    this.RoleService = new RoleService();
  }

  async getUserRole(userModel) {
    const role = await this.RoleService.Role.findById(userModel._id);

    if (!role) {
      return await this.UserService.getDefaultUserRole();
    }

    return role;
  }

  async getUserPermissions(userModel) {
    let permissions = [];
    const role = await this.getUserRole(userModel);

    if (!role) {
      return [];
    }

    permissions = await this.RoleService.getRolePermissions(role._id);

    permissions = permissions.map((item) => item.name);

    return permissions;
  }

  async createUser(req, res) {
    // Our register logic starts here
    try {
      // Get user input
      const {
        firstName, lastName, email, password,
      } = req.body;

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await this.User.findOne({ email });

      if (oldUser) {
        res.status(409).send('User Already Exist. Please Login');
        return;
      }

      // Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Get Default Role
      const role = await this.UserService.getDefaultUserRole();

      // Create user in our database
      const user = await this.User.create({
        firstName,
        lastName,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        role,
      });

      // GetPermissions
      const permissions = await this.getUserPermissions(user);

      // Create token
      const token = jwt.sign(
        {
          userId: user._id,
          firstName,
          lastName,
          email,
          role: role.name,
          permissions,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '1h',
        },
      );
      // save user token
      user.token = token;

      this.emitEvents('userRegistered', {
        email: user.email,
        role,
        permissions,
        token,
      });

      // return new user
      res.status(201).json({
        firstName,
        lastName,
        email: email.toLowerCase(),
        role: role.name,
        permissions,
        token,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async attemptLogin(req, res) {
    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate if user exist in our database
      const user = await this.User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const role = await this.getUserRole(user);
        const permissions = await this.getUserPermissions(user);

        const { firstName, lastName } = user;

        // Create token
        const token = jwt.sign(
          {
            userId: user._id,
            firstName,
            lastName,
            email,
            role: role.name,
            permissions,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: '1h',
          },
        );

        this.emitEvents('userLoggedIn', {
          email: user.email,
          role,
          permissions,
          token,
        });

        // user
        res.status(200).json({
          email: user.email,
          role,
          permissions,
          token,
        });
      } else {
        res.status(401).send('Invalid Credentials');
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Error!');
    }
  }

  emitEvents(key, value, topic = undefined) {
    if (this.eventEmitter === undefined) {
      this.eventEmitter = new AuthEvents();
    }

    this.eventEmitter[key](value, topic);
  }
}

export default AuthService;
