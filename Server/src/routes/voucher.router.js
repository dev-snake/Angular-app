const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/VoucherController");
router.post("/exchange-voucher", voucherController.exchangeVoucher);
router.delete("/:id", voucherController.delete);
router.post("/", voucherController.create);
router.get("/", voucherController.index);
module.exports = router;
