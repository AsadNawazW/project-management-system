import BaseListener from './BaseListener';

class RoleListener extends BaseListener {
  constructor() {
    super('role_events');
  }

  async roleCreated(roleModel) {
    console.log(`${roleModel.name} Role Created. This message is comming from the listeners`);
  }

  async roleUpdated(roleModel) {
    console.log(`${roleModel.name} Role Updated. This message is comming from the listeners`);
  }

  async roleDeleted(roleModel) {
    console.log(`${roleModel.name} Role Deleted. This message is comming from the listeners`);
  }
}

export default RoleListener;
