const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
router.put("/:category_id", categoryController.update);
router.delete("/:category_id", categoryController.delete);
router.post("/", categoryController.create);
router.get("/", categoryController.index);
module.exports = router;
