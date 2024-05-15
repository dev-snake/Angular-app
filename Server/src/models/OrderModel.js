const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const order = new Schema(
  {
    userId: { type: String },
    products: { type: Array, default: [] },
    status: { type: String, default: "Đang chờ xử lý" },
    total: { type: Number, default: 0 },
    date: { type: String, default: "" },
    code: { type: String },
    paymentMethod: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order-list", order);
