const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/angular-app");
  } catch (err) {
    console.log(err);
  }
};
module.exports = { connect };
