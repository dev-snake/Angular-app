const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const voucherSchema = new Schema({
  code: { type: String },
  discount: { type: String, default: "" },
  status: { type: Number, default: 1 },
  expiredDate: { type: String },
  description: { type: String },
  limitQuantity: { type: Number },
  createdAt: { type: String, default: new Date().toLocaleString() },
  quantityUsed: { type: Number, default: 0 },
});
module.exports = mongoose.model("voucher", voucherSchema);
