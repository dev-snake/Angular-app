const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
router.patch("/:id/updateStatus", orderController.updateStatus);
router.get("/:id/order-details", orderController.getOrderDetails);
router.put("/:id", orderController.update);
router.get("/", orderController.index);
module.exports = router;
