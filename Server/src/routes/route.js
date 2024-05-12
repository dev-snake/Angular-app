const homeRouter = require("./product.router");
const categoryRouter = require("./category.router");
const route = (app) => {
  app.use("/category", categoryRouter);
  app.use("/", homeRouter);
};
module.exports = route;
