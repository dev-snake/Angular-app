const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
router.post("/", categoryController.create);
router.get("/", categoryController.index);
module.exports = router;
