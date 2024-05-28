const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const product = new Schema(
  {
    name: { type: String },
    price: { type: Number },
    image: { type: String },
    category: { type: Number },
    title_description_1: { type: String, default: "" },
    title_description_2: { type: String, default: "" },
    description: { type: String, default: " " },
    sale: { type: Number, default: 0 },
    comments: { type: Array, default: [] },
    views: { type: Number, default: 0 },
    quantity_sold: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", product);
