
const ModelService = class {
  constructor() {
    this.Model = require('../models/Model');
    this.paginateOptions = {
      page: 1,
      limit: 10,
      select: ['name'],
    };
  }


  async getModel(req, res) {
    
    const oldModel = await this.Model.findById(
      req.params.modelId,
    );

    if (!oldModel) {
      res.status(404).send("Model doesn't exist!");
      return;
    }

    res.status(200).json({
      name: oldModel.name,
    });
  }

  async listModels(req, res) {
    const Models = await this.Model.paginate(
      {},
      this.paginateOptions,
    );
    res.status(200).send(Models);
  }

  async createModel(req, res) {
    const { name } = req.body;

    const oldModel = await this.Model.findOne({ name });

    if (oldModel) {
      res.status(409).send('Model Already Exist.');
      return;
    }

    const Model = await this.Model.create({
      name,
    });

    res.status(201).json({
      name,
    });
  }

  async updateModel(req, res) {
    const { name } = req.body;

    const oldModel = await this.Model.findById(
      req.params.modelId,
    );

    if (!oldModel) {
      res.status(404).send("Model doesn't exist.");
      return;
    }

    oldModel.name = name;
    oldModel.save();

    res.status(200).json({
      name,
    });
  }

  async deleteModel(req, res) {
    const oldModel = await this.Model.findById(
      req.params.modelId,
    );

    if (!oldModel) {
      res.status(404).send("Model doesn't exist.");
      return;
    }

    oldModel.delete();
    res.status(204).json({
      status: 'success',
    });
  }
};

module.exports = ModelService;
