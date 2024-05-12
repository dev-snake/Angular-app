const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", user);
