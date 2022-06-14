import BaseListener from './BaseListener';

class PermissionListener extends BaseListener {
  constructor() {
    super('permission_events');
  }

  async permissionCreated(permissionModel) {
    console.log(`${permissionModel.name} Permission Created. This message is comming from the listeners`);
  }

  async permissionUpdated(permissionModel) {
    console.log(`${permissionModel.name} Permission Updated. This message is comming from the listeners`);
  }

  async permissionDeleted(permissionModel) {
    console.log(`${permissionModel.name} Permission Deleted. This message is comming from the listeners`);
  }
}

export default PermissionListener;
