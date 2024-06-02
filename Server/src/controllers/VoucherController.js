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
      const newVoucher = req.body;
      await voucherModel.create(newVoucher);
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
}
module.exports = new VoucherController();
