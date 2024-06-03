const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const voucher = new Schema({
  code: { type: String },
  discount: { type: String },
  status: { type: Number, default: 1 },
  expiredDate: { type: String },
  description: { type: String },
  createdAt: { type: String, default: new Date().toLocaleString() },
});
module.exports = mongoose.model("voucher", voucher);
