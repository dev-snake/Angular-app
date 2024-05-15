const userModule = require("../models/UserModel");
class UserController {
  async index(req, res) {
    const users = await userModule.find();
    return res.status(200).json(users);
  }
  async create(req, res) {
    const user = await userModule.create(req.body);
    return res.status(200).json(user);
  }
  async update(req, res) {
    const user = await userModule.findByIdAndUpdate(id, user_id);
    return res.status(200).json(user);
  }
}
module.exports = new UserController();
