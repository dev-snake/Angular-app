const voucherModel = require("../models/VoucherModel");
const userModel = require("../models/UserModel");
class VoucherController {
  async index(req, res) {
    try {
      const vouchers = await voucherModel.find({});
      return res.json(vouchers);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async create(req, res) {
    try {
      await voucherModel.create(req.body);
      return res.json({ message: "Voucher Created" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      await voucherModel.findByIdAndDelete(id);
      return res.json({ message: "Voucher Deleted" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async exchangeVoucher(req, res) {
    try {
      const { voucherId, userId } = req.body;
      const voucher = await voucherModel.findById(voucherId);
      const user = await userModel.findById(userId);
      if (!voucher) {
        return res.status(400).json({ message: "Voucher not found" });
      }
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      user.point -= voucher.exchangeValue;
      user.myVoucher.push(voucher);
      voucher.quantityExchanged += 1;
      await voucher.save();
      await user.save();
      return res.status(200).json({ message: "Voucher Exchanged" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
module.exports = new VoucherController();
