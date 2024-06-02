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
  async cancelOrder(req, res) {
    try {
      const { orderId } = req.query;
      const order = await OrderModel.findOne({ code: "#" + orderId });
      const { userId } = order;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(400).json("User not found");
      }
      if (user) {
        const orderIndex = user.orders.find(
          (order) => order.code === "#" + orderId
        );
        orderIndex.status = 2;
        await UserModel.findOneAndUpdate({ _id: userId }, user, { new: true });
      }
      if (!order) {
        return res.status(400).json("Order not found");
      }
      if (order) {
        order.status = 2;
        await order.save();
      }
      return res.status(200).json("Order cancelled successfully");
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.findOne({ code: "#" + id });
      // if (!order) {
      //   return res.status(400).json("Order not found");
      // }
      // if (order) {
      //   order.status = 1;
      //   await order.save();
      // }
      console.log(order);
      return res.status(200).json("Order updated successfully");
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new OrderController();
