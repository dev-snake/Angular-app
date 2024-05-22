const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");
class OrderController {
  async index(req, res) {
    try {
      const orders = await OrderModel.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async update(req, res) {
    try {
      const { userId } = req.body;
      const user = await UserModel.findById(userId);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new OrderController();
