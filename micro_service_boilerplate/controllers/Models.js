// Load Service Imports
import ModelService from '../services/ModelService';

const ModelServiceObj = new ModelService();

export const listModelsResponse = async (req, res) => {
  await ModelServiceObj.listModels(req, res);
};
export const getModelResponse = async (req, res) => {
  await ModelServiceObj.getModel(req, res);
};
export const createModelResponse = async (req, res) => {
  await ModelServiceObj.createModel(req, res);
};
export const updateModelResponse = async (req, res) => {
  await ModelServiceObj.updateModel(req, res);
};
export const deleteModelResponse = async (req, res) => {
  await ModelServiceObj.deleteModel(req, res);
};
