const homeRouter = require("./product.router");
const categoryRouter = require("./category.router");
const userRouter = require("./user.router");
const route = (app) => {
  app.use("/users", userRouter);
  app.use("/category", categoryRouter);
  app.use("/", homeRouter);
};
module.exports = route;
