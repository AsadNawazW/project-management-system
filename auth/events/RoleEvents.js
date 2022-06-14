import BaseEvent from './BaseEvent';

class RoleEvents extends BaseEvent {
  constructor() {
    super();
    this.topic = 'role_events';
  }

  async roleCreated(roleModel) {
    await this.sendMessage('roleCreated', {
      action: 'roleCreated',
      data: roleModel,
    });
  }

  async roleUpdated(roleModel) {
    await this.sendMessage('roleUpdated', {
      action: 'roleUpdated',
      data: roleModel,
    });
  }

  async roleDeleted(roleModel) {
    await this.sendMessage('roleDeleted', {
      action: 'roleDeleted',
      data: roleModel,
    });
  }

  async rolePermissionAttached(rolePermissionModel) {
    await this.sendMessage('rolePermissionAttached', {
      action: 'rolePermissionAttached',
      data: rolePermissionModel,
    });
  }

  async rolePermissionDetached(rolePermissionModel) {
    await this.sendMessage('rolePermissionDetached', {
      action: 'rolePermissionDetached',
      data: rolePermissionModel,
    });
  }
}

export default RoleEvents;
