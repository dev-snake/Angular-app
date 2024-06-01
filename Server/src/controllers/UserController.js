const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class UserController {
  async index(req, res) {
    const users = await userModel.find();
    return res.status(200).json(users);
  }
  async login(req, res) {
    try {
      const { username, password } = req.query;
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Username hoặc password không đúng",
        });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({
          success: false,
          message: "Username hoặc password không đúng",
        });
      }
      if (user.active === 1) {
        return res
          .status(403)
          .json({ success: false, message: "Tài khoản của bạn đã bị khóa" });
      }

      res.json({
        success: true,
        message: "Đăng nhập thành công",
        username: user.username,
        userId: user._id,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Đã có lỗi xảy ra", error });
    }
  }
  async create(req, res) {
    try {
      const { password } = req.body;
      const newUser = {
        ...req.body,
        password: bcrypt.hashSync(password, saltRounds),
      };
      // console.log(bcrypt.compareSync(password, newUser.password));
      await userModel.create(newUser);
      return res.status(200).json({ message: "User created" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error creating user" });
    }
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
