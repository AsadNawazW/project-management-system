import BaseListener from './BaseListener';

class UserListener extends BaseListener {
  constructor() {
    super('user_events');
  }

  async userCreated(userModel) {
    console.log(`${userModel.email} User Created. This message is comming from the listeners`);
  }

  async userUpdated(userModel) {
    console.log(`${userModel.email} User Created. This message is comming from the listeners`);
  }

  async userDeleted(userModel) {
    console.log(`${userModel.email} User Deleted. This message is comming from the listeners`);
  }

  async userPasswordChanged(userModel) {
    console.log(`${userModel.email} User Password Changed. This message is comming from the listeners`);
  }

  async userRoleChanged(userModel) {
    console.log(`${userModel.email} User Role Changed. This message is comming from the listeners`);
  }
}

export default UserListener;
