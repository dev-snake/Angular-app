const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const category = new Schema(
  {
    category_id: { type: Number },
    category_name: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("category", category);
