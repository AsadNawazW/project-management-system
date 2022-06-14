import BaseEvent from './BaseEvent';

class ModelEvents extends BaseEvent {
  constructor() {
    super();
    this.topic = 'model_events';
  }

  async modelCreated(modelModel) {
    await this.sendMessage('modelCreated', {
      action: 'modelCreated',
      data: modelModel,
    });
  }

  async modelUpdated(modelModel) {
    await this.sendMessage('modelUpdated', {
      action: 'modelUpdated',
      data: modelModel,
    });
  }

  async modelDeleted(modelModel) {
    await this.sendMessage('modelDeleted', {
      action: 'modelDeleted',
      data: modelModel,
    });
  }
}

export default ModelEvents;
