const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let RoleService = class {
  constructor() {
    this.Role = require("../models/Role");
  }
  async getRole(req,res)
  {

  }
  async createRole(req,res)
  {
      const { name } = req.body;

      const oldRole = await this.Role.findOne({ name });

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

  }
  async deleteRole(req,res)
  {

  }
};

module.exports = RoleService;
