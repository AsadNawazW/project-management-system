const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let RoleService = class {
  constructor() {
    this.Role = require("../models/Role");
    this.Permission = require("../models/Permission");
    this.RolePermission = require("../models/RolePermission");
    this.paginateOptions = {
      page: 1,
      limit: 10,
      select : [
        'name'
      ]
    }
  }

  async getRolePermissions(roleModel)
  {

  }

  async getRole(req,res)
  {
    
    const oldRole = await this.Role.findById(req.params.userId)

    if (!oldRole) {
      res.status(404).send("Role doesn't exist!");
      return
    }

    res.status(200).json({        
      name: oldRole.name,      
    });

  }

  async listRoles(req,res)
  {
    let roles = await this.Role.paginate({},this.paginateOptions)
    res.status(200).send(roles)    
  }


  async createRole(req,res)
  {
      const { name } = req.body;

      const oldRole = await this.Role.findOne({ name : name });

      if (oldRole) {
        res.status(409).send("Role Already Exist.");
        return
      }

      const role = await this.Role.create({
        name : name
      })

      res.status(201).json({        
        name: name
      });

  }
  async updateRole(req,res)
  {
      const { name,new_name } = req.body;

      const oldRole = await this.Role.findOne({ name : name });

      if (!oldRole) {
        res.status(404).send("Role doesn't exist.");
        return
      }
      
      oldRole.name = new_name
      oldRole.save()

      res.status(200).json({        
        name: new_name
      });
  }
  async deleteRole(req,res)
  {
    const { name,new_name } = req.body;

    const oldRole = await this.Role.findOne({ name : name });

    if (!oldRole) {
      res.status(404).send("Role doesn't exist.");
      return
    }

    oldRole.delete()
    res.status(204).json({        
      status : "success"
    });
    
  }
  async createRolePermission(req,res)
  {    
    let permission;
    let rolePermission;

    const name  = req.params.name;    
    const { permissions } = req.body;
    
    const role = await this.Role.findOne({ name : name });

    if (!role) {
      res.status(404).send("Role doesn't exist.");
      return
    }

    
    for(const permissionName of permissions)
    {
      permission = await this.Permission.findOne({ name : permissionName });
      
      if (!permission) {
        res.status(404).send("Permission : " + permissionName + " doesn't exist.");
        return;
      }

      rolePermission = await this.RolePermission.findOne(
        {
            role : role,
            permission : permission 
        }
      );

      if (!rolePermission) 
      {            
        rolePermission = await this.RolePermission.create({
            role: role,
            permission: permission
        }); 

      }
    }

    res.status(201).json({        
      permissions : permissions
    });



  }
  async deleteRolePermission(req,res)
  {
    let permission;
    let rolePermission;

    const name  = req.params.name;    
    const { permissions } = req.body;
    
    const role = await this.Role.findOne({ name : name });

    if (!role) {
      res.status(404).send("Role doesn't exist.");
      return
    }

    
    for(const permissionName of permissions)
    {
      permission = await this.Permission.findOne({ name : permissionName });
      
      if (!permission) {
        res.status(404).send("Permission : " + permissionName + " doesn't exist.");
        return;
      }

      rolePermission = await this.RolePermission.findOne(
        {
            role : role,
            permission : permission 
        }
      );

      if (rolePermission) 
      {            
        rolePermission.delete()
      }
    }

    res.status(204).json({        
      status : "success"
    });
  }
  
}; 

module.exports = RoleService;
