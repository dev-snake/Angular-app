const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema(
  {
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: Number, default: 0 },
    address: { type: String, default: "" },
    orders: { type: Array, default: [] },
    active: { type: Number, default: 0 },
    dateOfBirth: { type: String, default: "" },
    sex: { type: String, default: "" },
    phonenumber: { type: String, default: "" },
    point: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", user);
