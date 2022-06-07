import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let UserService = class {
  constructor() {
    this.User = require("../models/User");
    this.Role = require("../models/Role");
    this.RoleService = require("./RoleService");
    this.RoleService = new this.RoleService;
    this.paginateOptions = {
      page: 1,
      limit: 10,
      select : [
        'first_name',
        'last_name',
        'email'
      ]
    }
  }
  async getDefaultUserRole()
  {
    let role = await this.Role.findOne({ name : 'user' })

    if (!role) {      
      return null;
    }
   
    return role;
  }
  async getUserRole(userModel)
  {
    let role = await this.Role.findById(userModel.role)

    if (!role) {      
      return await this.getDefaultUserRole();
    }

    return role;
  }
  async getUserPermissions(userModel)
  {
    let permissions = [];
    let role = await this.getUserRole(userModel)

    if (!role) {      
      return [];
    }

    permissions = await this.RoleService.getRolePermissions(role._id)
    
    return permissions;
  }
  
  async getUser(req,res)
  {
    
    const oldUser = await this.User.findById(req.params.userId)

    if (!oldUser) {
      res.status(404).send("User doesn't exist!");
      return
    }
    
    res.status(200).json({        
      first_name: oldUser.first_name,
      last_name: oldUser.last_name,
      email: oldUser.email,
      role: await this.getUserRole(oldUser),
      permissions: await this.getUserPermissions(oldUser),
    });

  }

  async listUsers(req,res)
  {
    let users = await this.User.paginate({},this.paginateOptions)
    res.status(200).send(users)    
  }

  async createUser(req,res)
  {
      const { first_name, last_name, email, password } = req.body;

      const oldUser = await this.User.findOne({ email : email });

      if (oldUser) {
        res.status(409).send("User Already Exist.");
        return
      }

      const role = await this.getDefaultUserRole();

      const user = await this.User.create({ first_name, last_name, email, password , role })

      res.status(201).json({
        email: user.email,          
        role: await this.getUserRole(user),
        permissions: await this.getUserPermissions(user),        
      });

  }
  async updateUser(req,res)
  {
      const {  email } = req.body;

      const oldUser = await this.User.findById(req.params.userId);

      if (!oldUser) {
        res.status(404).send("User doesn't exist.");
        return
      }     
      
      if(req.body.first_name)
      {
        oldUser.first_name = req.body.first_name
      }

      if(req.body.last_name)
      {
        oldUser.last_name = req.body.last_name
      }     
      
      if(req.body.password)
      {
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        oldUser.password = encryptedPassword
      }
      
      oldUser.save()

      res.status(200).json({        
        first_name: oldUser.first_name,
        last_name: oldUser.last_name,
        email: oldUser.email,
      });
  }
  async deleteUser(req,res)
  {
    const { email } = req.body;

    const oldUser = await this.User.findById(req.params.userId);

    if (!oldUser) {
      res.status(404).send("User doesn't exist.");
      return
    }

    oldUser.delete()
    res.status(204).json({        
      status : "success"
    });
    
  }
}; 

module.exports = UserService;
