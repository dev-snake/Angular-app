const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/VoucherController");
router.post("/", voucherController.create);
router.get("/", voucherController.index);
module.exports = router;
