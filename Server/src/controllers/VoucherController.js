const voucherModel = require("../models/voucherModel");
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
      return res.json({ message: "Voucher Controller" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
module.exports = new VoucherController();
