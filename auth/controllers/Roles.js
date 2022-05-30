
// Load Service Imports
const RoleService = require("../services/RoleService");

let RoleServiceObj = new RoleService;

const getRoleResponse = async (req, res) => {
    await RoleServiceObj.getRole(req,res)
}
const createRoleResponse = async (req, res) => {
    await RoleServiceObj.createRole(req,res)
}
const updateRoleResponse = async (req, res) => {
    await RoleServiceObj.updateRole(req,res)
}
const deleteRoleResponse = async (req, res) => {
    await RoleServiceObj.deleteRole(req,res)
}

module.exports =  {
    getRoleResponse,
    createRoleResponse,
    updateRoleResponse,
    deleteRoleResponse
};

