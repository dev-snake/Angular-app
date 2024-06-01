const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const order = new Schema(
  {
    userId: { type: String },
    products: { type: Array, default: [] },
    status: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    date: { type: String, default: "" },
    code: { type: String },
    paymentMethod: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    userOrder: { type: String, default: "" },
    amount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order-list", order);
