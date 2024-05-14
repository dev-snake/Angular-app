const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: "user" },
    address: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", user);
