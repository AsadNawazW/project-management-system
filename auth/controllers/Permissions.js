
// Load Service Imports
import PermissionService from "../services/PermissionService";

let PermissionServiceObj = new PermissionService;


const listPermissionsResponse = async (req, res) => {
    await PermissionServiceObj.listPermissions(req,res)
}
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
    listPermissionsResponse,
    getPermissionResponse,
    createPermissionResponse,
    updatePermissionResponse,
    deletePermissionResponse
};

