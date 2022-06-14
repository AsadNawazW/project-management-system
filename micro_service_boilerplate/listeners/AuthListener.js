import BaseListener from './BaseListener';

class AuthListener extends BaseListener {
  constructor() {
    super('auth_events');
  }

  async userRegistered(userModel) {
    console.log(`${userModel.email} Registered. This message is comming from the listeners`);
  }

  async userLoggedIn(userModel) {
    console.log(`${userModel.email} Logged In. This message is comming from the listeners`);
  }
}

export default AuthListener;
