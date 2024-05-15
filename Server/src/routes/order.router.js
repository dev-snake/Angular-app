const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
router.put("/:id", orderController.update);
router.get("/", orderController.index);
module.exports = router;
