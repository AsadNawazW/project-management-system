import BaseEvent from './BaseEvent';

class PermissionEvents extends BaseEvent {
  constructor() {
    super();
    this.topic = 'permission_events';
  }

  async permissionCreated(permissionModel) {
    await this.sendMessage('permissionCreated', {
      action: 'permissionCreated',
      data: permissionModel,
    });
  }

  async permissionUpdated(permissionModel) {
    await this.sendMessage('permissionUpdated', {
      action: 'permissionUpdated',
      data: permissionModel,
    });
  }

  async permissionDeleted(permissionModel) {
    await this.sendMessage('permissionDeleted', {
      action: 'permissionDeleted',
      data: permissionModel,
    });
  }
}

export default PermissionEvents;
