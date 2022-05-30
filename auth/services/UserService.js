let UserService = class {
  constructor() {
    this.User = require("../models/user");
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
        return res.status(409).send("User Already Exist. Please Login");
      }

      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);

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
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;

      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  }

  async attemptLogin(req, res) {}

  async deleteUser(req, res) {}
};

module.exports = UserService;
