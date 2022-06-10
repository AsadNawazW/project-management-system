// Global Imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Local Imports
import ac from "../acl/init";
import BaseService from "./BaseService";
import User from "../models/User";
import UserService from "./UserService";
import RoleService from "./RoleService";

class AuthService extends BaseService {
  constructor() {
    super()
    this.User = User
    this.UserService = new UserService()        
    this.RoleService = new RoleService()
  }

  async getUserRole(userModel)
  {
    let role = await this.RoleService.Role.findById(userModel._id)

    if (!role) {      
      return await this.UserService.getDefaultUserRole();
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
    
    permissions = permissions.map(function(item){
      return item.name      
    })
    
    return permissions;
  }

  async createUser(req, res) {    
    // Our register logic starts here
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await this.User.findOne({ email });

      if (oldUser) {
        res.status(409).send("User Already Exist. Please Login");
        return
      }

      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);


      // Get Default Role
      const role = await this.UserService.getDefaultUserRole();


      // Create user in our database
      const user = await this.User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        role: role
      });


      // GetPermissions
      const permissions = await this.getUserPermissions(user)

      

      // Create token
      const token = jwt.sign(
        {
          user_id: user._id,
          first_name,
          last_name,
          email,        
          role : role.name,
          permissions  
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
      // save user token
      user.token = token;

      // return new user
      res.status(201).json({
        first_name,
        last_name,
        email: email.toLowerCase(),
        role: role.name,
        permissions,       
        token: token,
      });
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async attemptLogin(req, res) {
    
    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;

       // Validate if user exist in our database
       const user = await this.User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) 
      {

        const role=  await this.getUserRole(user)
        const permissions = await this.getUserPermissions(user)
        
        const { first_name, last_name} = user;

        // Create token
        const token = jwt.sign(
          {
            user_id: user._id,
            first_name,
            last_name,
            email,        
            role : role.name,
            permissions  
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "1h",
          }
        );

        // save user token
        user.token = token;

        // user
        res.status(200).json({
          email: user.email,          
          role,
          permissions,
          token: token,          
        });
      }
      else{
        res.status(401).send("Invalid Credentials");
      }      
    } catch (err) { 
      console.log(err);
      res.status(500).send('Error!'); 
    }
    return
  }
  
};

module.exports = AuthService;
