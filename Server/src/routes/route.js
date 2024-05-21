const productRouter = require("./product.router");
const categoryRouter = require("./category.router");
const userRouter = require("./user.router");
const orderRouter = require("./order.router");
const route = (app) => {
  app.use("/order", orderRouter);
  app.use("/users", userRouter);
  app.use("/category", categoryRouter);
  app.use("/", productRouter);
};
module.exports = route;
