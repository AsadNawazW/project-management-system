const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let UserService = class {
  constructor() {
    this.User = require("../models/User");
  }
  async getUser(req,res)
  {

  }
  async createUser(req,res)
  {
      const { name } = req.body;

      const oldUser = await this.User.findOne({ name });

      if (oldUser) {
        res.status(409).send("User Already Exist.");
        return
      }

      const role = await this.User.create({
        name : name
      })
      res.status(201).json({
        id : role._id,
        name: name
      });
  }
  async updateUser(req,res)
  {

  }
  async deleteUser(req,res)
  {

  }
};

module.exports = UserService;
