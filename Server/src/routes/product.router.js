const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
router.delete("/data/:id", productController.deleteProduct);
router.post("/data", productController.createProduct);
router.get("/data", productController.getAllProducts);
router.get("/", productController.getAllProducts);
module.exports = router;
