const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
router.put("/update-order/:id", orderController.updateOrder);
router.post("/cancel-order", orderController.cancelOrder);
router.patch("/:id/updateStatus", orderController.updateStatus);
router.get("/:id/order-details", orderController.getOrderDetails);
router.put("/:id", orderController.update);
router.get("/", orderController.index);
module.exports = router;
