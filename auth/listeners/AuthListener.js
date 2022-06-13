import BaseListener from './BaseListener';

class AuthListener extends BaseListener {
  constructor() {
    super('auth_events');
  }

  async userRegistered(userModel) {

  }

  async userLoggedIn(userModel) {
    console.log(`${userModel.email} Logged In. This message is comming from the listeners`);
  }

  async userLoggedOut(userModel) {

  }

  async userCreated(userModel) {

  }

  async userUpdated(userModel) {

  }

  async userDeleted(userModel) {

  }

  async userPasswordChanged(userModel) {

  }

  async userRoleChanged(userModel) {

  }
}

export default AuthListener;
