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
  async lockUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userModule.findByIdAndUpdate(id, { active: 1 });
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error locking user" });
    }
  }
  async unlockUser(req, res) {
    try {
      const { id } = req.params;
      await userModule.findByIdAndUpdate(id, { active: 0 });
      return res.status(200).json({ message: "User unlocked" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error unlocking user" });
    }
  }
}
module.exports = new UserController();
