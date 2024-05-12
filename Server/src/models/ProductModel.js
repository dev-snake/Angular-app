const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const product = new Schema(
  {
    name: { type: String },
    price: { type: Number },
    image: { type: String },
    category: { type: Number },
    title_description_1: { type: String },
    title_description_2: { type: String },
    description: { type: String },
    sale: { type: Number },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", product);
