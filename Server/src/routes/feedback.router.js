const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/FeedbackController");
router.post("/", feedbackController.create);
router.get("/", feedbackController.index);
module.exports = router;
