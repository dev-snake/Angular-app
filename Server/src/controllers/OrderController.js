const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");
class OrderController {
  async index(req, res) {
    try {
      console.log(req.query);
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
  async getOrderDetails(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.findById(id);
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { statusValue } = req.query;
      const { userId, code } = req.body;
      const userToUpdate = await UserModel.findOne({ _id: userId });
      if (userToUpdate) {
        const orderToUpdate = userToUpdate.orders.find(
          (user) => user.code === code
        );
        if (orderToUpdate) {
          orderToUpdate.status = +statusValue;
          const newUpdate = await UserModel.findOneAndUpdate(
            { _id: userId },
            userToUpdate,
            {
              new: true,
            }
          );
        }
      }
      await OrderModel.findByIdAndUpdate(id, { status: +statusValue });
      return res.status(200).json("Updated successfully");
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new OrderController();
