const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
router.put("/:id", userController.update);
router.get("/", userController.index);
router.post("/", userController.create);
module.exports = router;
