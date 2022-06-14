import BaseListener from './BaseListener';

class ModelListener extends BaseListener {
  constructor() {
    super('model_events');
  }

  async modelCreated(modelModel) {
    console.log(`${modelModel.name} Model Created. This message is comming from the listeners`);
  }

  async modelUpdated(modelModel) {
    console.log(`${modelModel.name} Model Updated. This message is comming from the listeners`);
  }

  async modelDeleted(modelModel) {
    console.log(`${modelModel.name} Model Deleted. This message is comming from the listeners`);
  }
}

export default ModelListener;
