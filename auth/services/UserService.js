import bcrypt from 'bcrypt';
import UserEvents from '../events/UserEvents';

const UserService = class {
  constructor() {
    this.User = require('../models/User');
    this.Role = require('../models/Role');
    this.RoleService = require('./RoleService');
    this.RoleService = new this.RoleService();
    this.paginateOptions = {
      page: 1,
      limit: 10,
      select: [
        'firstName',
        'lastName',
        'email',
      ],
    };
  }

  async getDefaultUserRole() {
    const role = await this.Role.findOne({ name: 'user' });

    if (!role) {
      return null;
    }

    return role;
  }

  async getUserRole(userModel) {
    const role = await this.Role.findById(userModel.role);

    if (!role) {
      return await this.getDefaultUserRole();
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

    return permissions;
  }

  async getUser(req, res) {
    const oldUser = await this.User.findById(req.params.userId);

    if (!oldUser) {
      res.status(404).send("User doesn't exist!");
      return;
    }

    res.status(200).json({
      firstName: oldUser.firstName,
      lastName: oldUser.lastName,
      email: oldUser.email,
      role: await this.getUserRole(oldUser),
      permissions: await this.getUserPermissions(oldUser),
    });
  }

  async listUsers(req, res) {
    const users = await this.User.paginate({}, this.paginateOptions);
    res.status(200).send(users);
  }

  async createUser(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;

    const oldUser = await this.User.findOne({ email });

    if (oldUser) {
      res.status(409).send('User Already Exist.');
      return;
    }

    const role = await this.getDefaultUserRole();

    const user = await this.User.create({
      firstName, lastName, email, password, role,
    });

    res.status(201).json({
      firstName,
      lastName,
      email: user.email,
      role: await this.getUserRole(user),
      permissions: await this.getUserPermissions(user),
    });
  }

  async updateUser(req, res) {
    const oldUser = await this.User.findById(req.params.userId);

    if (!oldUser) {
      res.status(404).send("User doesn't exist.");
      return;
    }

    if (req.body.firstName) {
      oldUser.firstName = req.body.firstName;
    }

    if (req.body.lastName) {
      oldUser.lastName = req.body.lastName;
    }

    if (req.body.password) {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      oldUser.password = encryptedPassword;
    }

    oldUser.save();

    res.status(200).json({
      firstName: oldUser.firstName,
      lastName: oldUser.lastName,
      email: oldUser.email,
      role: await this.getUserRole(oldUser),
      permissions: await this.getUserPermissions(oldUser),
    });
  }

  async deleteUser(req, res) {
    const oldUser = await this.User.findById(req.params.userId);

    if (!oldUser) {
      res.status(404).send("User doesn't exist.");
      return;
    }

    oldUser.delete();
    res.status(204).json({
      status: 'success',
    });
  }

  async addUserRole(req, res) {
    const oldUser = await this.User.findById(req.params.userId);

    if (!oldUser) {
      res.status(404).send("User doesn't exist.");
      return;
    }

    const { role: roleName } = req.body;

    const role = await this.Role.findOne({ name: roleName });

    if (!role) {
      res.status(404).send("Role doesn't exist.");
      return;
    }

    oldUser.role = role;

    oldUser.save();

    res.status(200).json({
      firstName: oldUser.firstName,
      lastName: oldUser.lastName,
      email: oldUser.email,
      role: await this.getUserRole(oldUser),
      permissions: await this.getUserPermissions(oldUser),
    });
  }

  emitEvents(key, value, topic = undefined) {
    if (this.eventEmitter === undefined) {
      this.eventEmitter = new UserEvents();
    }

    this.eventEmitter[key](value, topic);
  }
};

module.exports = UserService;
