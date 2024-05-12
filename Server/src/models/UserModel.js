const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    isActivated: { type: Boolean, required: true },
    activationToken: { type: String },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", user);
