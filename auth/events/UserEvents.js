import BaseEvent from './BaseEvent';

class UserEvents extends BaseEvent {
  constructor() {
    super();
    this.topic = 'user_events';
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

export default UserEvents;
