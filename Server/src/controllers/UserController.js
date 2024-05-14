const userModule = require("../models/UserModel");
class UserController {
  async index(req, res) {
    const users = await userModule.find();
    return res.status(200).json(users);
  }
  async create(req, res) {
    const user = await userModule.create(req.body);
    console.log(user);
    return res.status(200).json(user);
  }
}
module.exports = new UserController();
