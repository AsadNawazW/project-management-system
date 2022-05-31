
// Load Service Imports
const PermissionService = require("../services/PermissionService");

let PermissionServiceObj = new PermissionService;

const getPermissionResponse = async (req, res) => {
    await PermissionServiceObj.getPermission(req,res)
}
const createPermissionResponse = async (req, res) => {
    await PermissionServiceObj.createPermission(req,res)
}
const updatePermissionResponse = async (req, res) => {
    await PermissionServiceObj.updatePermission(req,res)
}
const deletePermissionResponse = async (req, res) => {
    await PermissionServiceObj.deletePermission(req,res)
}

module.exports =  {
    getPermissionResponse,
    createPermissionResponse,
    updatePermissionResponse,
    deletePermissionResponse
};

