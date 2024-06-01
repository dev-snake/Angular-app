const productRouter = require("./product.router");
const categoryRouter = require("./category.router");
const userRouter = require("./user.router");
const orderRouter = require("./order.router");
const voucherRouter = require("./voucher.router");
const route = (app) => {
  app.use("/vouchers", voucherRouter);
  app.use("/order", orderRouter);
  app.use("/users", userRouter);
  app.use("/categories", categoryRouter);
  app.use("/", productRouter);
};
module.exports = route;
