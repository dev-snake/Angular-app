const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./config/connect.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(require("cors")());
db.connect();
const route = require("./src/routes/route");
app.use(morgan("dev"));
route(app);
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
