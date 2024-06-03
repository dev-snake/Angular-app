const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedback = new Schema(
  {
    userId: { type: String },
    productId: { type: String },
    feedback: { type: String },
    date: { type: String },
    levelOfSatisfaction: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Feedback", feedback);
