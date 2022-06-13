import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const RoleService = class {
  constructor() {
    this.Role = require('../models/Role');
    this.Permission = require('../models/Permission');
    this.RolePermission = require('../models/RolePermission');
    this.paginateOptions = {
      page: 1,
      limit: 10,
      select: [
        'name',
      ],
    };
  }

  async getRolePermissionsArray(roleModel) {
    let rolePermissionsArr = await this.getRolePermissions(roleModel);

    rolePermissionsArr = rolePermissionsArr.map((item) => item.name);

    return rolePermissionsArr;
  }

  async getRolePermissions(roleModel) {
    let rolePermissionsArr = [];
    const permissionArr = [];

    const rolePermissions = await this.RolePermission.find({
      role: roleModel,
    });

    if (!rolePermissions) {
      return rolePermissionsArr;
    }

    for (const rolePermission of rolePermissions) {
      permissionArr.push(rolePermission.permission);
    }

    rolePermissionsArr = await this.Permission.find({ _id: { $in: permissionArr } }).select('name');

    return rolePermissionsArr;
  }

  async getRole(req, res) {
    const oldRole = await this.Role.findById(req.params.roleId);

    if (!oldRole) {
      res.status(404).send("Role doesn't exist!");
      return;
    }

    res.status(200).json({
      name: oldRole.name,
      permissions: await this.getRolePermissionsArray(oldRole),
    });
  }

  async listRoles(req, res) {
    const roles = await this.Role.paginate({}, this.paginateOptions);
    res.status(200).send(roles);
  }

  async createRole(req, res) {
    const { name } = req.body;

    const oldRole = await this.Role.findOne({ name });

    if (oldRole) {
      res.status(409).send('Role Already Exist.');
      return;
    }

    const role = await this.Role.create({
      name,
    });

    res.status(201).json({
      name,
      permissions: await this.getRolePermissionsArray(oldRole),
    });
  }

  async updateRole(req, res) {
    const { name } = req.body;

    const oldRole = await this.Role.findById(req.params.roleId);

    if (!oldRole) {
      res.status(404).send("Role doesn't exist.");
      return;
    }

    oldRole.name = name;
    oldRole.save();

    res.status(200).json({
      name: oldRole.name,
      permissions: await this.getRolePermissionsArray(oldRole),
    });
  }

  async deleteRole(req, res) {
    const oldRole = await this.Role.findById(req.params.roleId);

    if (!oldRole) {
      res.status(404).send("Role doesn't exist.");
      return;
    }

    oldRole.delete();
    res.status(204).send();
  }

  async createRolePermission(req, res) {
    let permission;
    let rolePermission;

    const { name } = req.params;
    const { permissions } = req.body;

    const role = await this.Role.findById(req.params.roleId);

    if (!role) {
      res.status(404).send("Role doesn't exist.");
      return;
    }

    for (const permissionName of permissions) {
      permission = await this.Permission.findOne({ name: permissionName });

      if (!permission) {
        res.status(404).send(`Permission : ${permissionName} doesn't exist.`);
        return;
      }

      rolePermission = await this.RolePermission.findOne(
        {
          role,
          permission,
        },
      );

      if (!rolePermission) {
        rolePermission = await this.RolePermission.create({
          role,
          permission,
        });
      }
    }

    res.status(201).json({
      name: role.name,
      permissions: await this.getRolePermissionsArray(role),
    });
  }

  async deleteRolePermission(req, res) {
    let permission;
    let rolePermission;

    const { permissions } = req.body;

    const role = await this.Role.findById(req.params.roleId);

    if (!role) {
      res.status(404).send("Role doesn't exist.");
      return;
    }

    for (const permissionName of permissions) {
      permission = await this.Permission.findOne({ name: permissionName });

      if (!permission) {
        res.status(404).send(`Permission : ${permissionName} doesn't exist.`);
        return;
      }

      rolePermission = await this.RolePermission.findOne(
        {
          role,
          permission,
        },
      );

      if (rolePermission) {
        rolePermission.delete();
      }
    }

    res.status(204).send();
  }
};

module.exports = RoleService;
