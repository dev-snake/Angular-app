const userModel = require("../models/UserModel");
class UserController {
  async index(req, res) {
    const users = await userModel.find();
    return res.status(200).json(users);
  }
  async create(req, res) {
    const user = await userModel.create(req.body);
    return res.status(200).json(user);
  }
  async update(req, res) {
    const user = await userModel.findByIdAndUpdate(id, user_id);
    return res.status(200).json(user);
  }
  async lockUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.findByIdAndUpdate(id, { active: 1 });
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error locking user" });
    }
  }
  async unlockUser(req, res) {
    try {
      const { id } = req.params;
      await userModel.findByIdAndUpdate(id, { active: 0 });
      return res.status(200).json({ message: "User unlocked" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error unlocking user" });
    }
  }
  async updateAccount(req, res) {
    try {
      const { years, month, day, sex, phonenumber, address } = req.body;
      const { id } = req.params;
      const newUpdate = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        sex: sex === "1" ? "Nam" : "Nữ",
        phonenumber,
        dateOfBirth: `${day}/${month}/${years}`,
        address,
      };
      await userModel.findOneAndUpdate({ _id: id }, newUpdate, { new: true });
      return res.status(200).json("Updated user Successfully !");
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
module.exports = new UserController();
