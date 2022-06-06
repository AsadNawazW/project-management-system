import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let PermissionService = class {
  constructor() {
    this.Permission = require("../models/Permission");    
    this.paginateOptions = {
      page: 1,
      limit: 10,
      select : [
        'name'
      ]
    }
  }

  async getRolesWithThisPermission(roleModel)
  {

  }

  async getPermission(req,res)
  {
    
    const oldPermission = await this.Permission.findById(req.params.permissionId)

    if (!oldPermission) {
      res.status(404).send("Permission doesn't exist!");
      return
    }

    res.status(200).json({        
      name: oldPermission.name,      
    });

  }

  async listPermissions(req,res)
  {
    let permissions = await this.Permission.paginate({},this.paginateOptions)
    res.status(200).send(permissions)    
  }

  async createPermission(req,res)
  {
      const { name } = req.body;

      const oldPermission = await this.Permission.findOne({ name : name });

      if (oldPermission) {
        res.status(409).send("Permission Already Exist.");
        return
      }

      const permission = await this.Permission.create({
        name : name
      })

      res.status(201).json({        
        name: name
      });

  }
  async updatePermission(req,res)
  {
      const { name,new_name } = req.body;

      const oldPermission = await this.Permission.findOne({ name : name });

      if (!oldPermission) {
        res.status(404).send("Permission doesn't exist.");
        return
      }
      
      oldPermission.name = new_name
      oldPermission.save()

      res.status(200).json({        
        name: new_name
      });
  }
  async deletePermission(req,res)
  {
    const { name,new_name } = req.body;

    const oldPermission = await this.Permission.findOne({ name : name });

    if (!oldPermission) {
      res.status(404).send("Permission doesn't exist.");
      return
    }

    oldPermission.delete()
    res.status(204).json({        
      status : "success"
    });
    
  }
}; 

module.exports = PermissionService;
