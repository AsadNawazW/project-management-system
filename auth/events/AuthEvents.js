import BaseEvent from './BaseEvent';

class AuthEvents extends BaseEvent {
  constructor() {
    super();
    this.topic = 'auth_events';
  }

  async userRegistered(userModel) {
    await this.sendMessage('userRegistered', {
      action: 'userRegistered',
      data: userModel,
    });
  }

  async userLoggedIn(userModel) {
    await this.sendMessage('userLoggedIn', {
      action: 'userLoggedIn',
      data: userModel,
    });
  }

  async userLoggedOut(userModel) {
    await this.sendMessage('userLoggedOut', {
      action: 'userLoggedOut',
      data: userModel,
    });
  }

  async userCreated(userModel) {
    await this.sendMessage('userCreated', {
      action: 'userCreated',
      data: userModel,
    });
  }

  async userUpdated(userModel) {
    await this.sendMessage('userUpdated', {
      action: 'userUpdated',
      data: userModel,
    });
  }

  async userDeleted(userModel) {
    await this.sendMessage('userDeleted', {
      action: 'userDeleted',
      data: userModel,
    });
  }

  async userPasswordChanged(userModel) {
    await this.sendMessage('userPasswordChanged', {
      action: 'userPasswordChanged',
      data: userModel,
    });
  }

  async userRoleChanged(userModel) {
    await this.sendMessage('userRoleChanged', {
      action: 'userRoleChanged',
      data: userModel,
    });
  }
}

export default AuthEvents;
