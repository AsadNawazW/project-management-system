import PermissionEvents from '../events/PermissionEvents';
import PermissionModel from '../models/Permission';

const PermissionService = class {
  constructor() {
    this.Permission = PermissionModel;
    this.paginateOptions = {
      page: 1,
      limit: 10,
      select: ['name'],
    };
  }

  async getPermission(req, res) {
    const oldPermission = await this.Permission.findById(
      req.params.permissionId,
    );

    if (!oldPermission) {
      res.status(404).send("Permission doesn't exist!");
      return;
    }

    res.status(200).json({
      name: oldPermission.name,
    });
  }

  async listPermissions(req, res) {
    const permissions = await this.Permission.paginate(
      {},
      this.paginateOptions,
    );
    res.status(200).send(permissions);
  }

  async createPermission(req, res) {
    const { name } = req.body;

    const oldPermission = await this.Permission.findOne({ name });

    if (oldPermission) {
      res.status(409).send('Permission Already Exist.');
      return;
    }

    const permission = await this.Permission.create({
      name,
    });

    this.emitEvents('permissionCreated', permission);

    res.status(201).json({
      name,
    });
  }

  async updatePermission(req, res) {
    const { name } = req.body;

    const oldPermission = await this.Permission.findById(
      req.params.permissionId,
    );

    if (!oldPermission) {
      res.status(404).send("Permission doesn't exist.");
      return;
    }

    oldPermission.name = name;
    oldPermission.save();

    this.emitEvents('permissionUpdated', oldPermission);

    res.status(200).json({
      name,
    });
  }

  async deletePermission(req, res) {
    const oldPermission = await this.Permission.findById(
      req.params.permissionId,
    );

    if (!oldPermission) {
      res.status(404).send("Permission doesn't exist.");
      return;
    }

    oldPermission.delete();

    this.emitEvents('permissionDeleted', oldPermission);

    res.status(204).json({
      status: 'success',
    });
  }

  emitEvents(key, value, topic = undefined) {
    if (this.eventEmitter === undefined) {
      this.eventEmitter = new PermissionEvents();
    }

    this.eventEmitter[key](value, topic);
  }
};

module.exports = PermissionService;
