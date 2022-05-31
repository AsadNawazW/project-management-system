const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let PermissionService = class {
  constructor() {
    this.Permission = require("../models/Permission");
  }
  async getPermission(req,res)
  {

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
