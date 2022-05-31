const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ac = require('../acl/init');


let AuthService = class {
  constructor() {
    this.User = require("../models/User");
    this.UserService = require("./UserService");
    this.UserService = new this.UserService;
    
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
      
      // Create user in our database
      const user = await this.User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });

      

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
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
        roles: user.roles,        
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
        // Create token
        const token = jwt.sign(
          {
            user_id: user._id,
            email: user.email,
            scopes: user.scopes,
          },
          process.env.TOKEN_KEY, 
          {
            expiresIn: "2h",
          }
        );

        // save user token
        user.token = token;

        // user
        res.status(200).json({
          email: user.email,          
          role: await this.UserService.getUserRole(user),
          permissions: await this.UserService.getUserPermissions(user),
          token: token,          
        });
      }
      else{
        res.status(400).send("Invalid Credentials");
      }      
    } catch (err) { 
      console.log(err);
      res.status(500).send('Error!'); 
    }
    return
  }
  
};

module.exports = AuthService;
