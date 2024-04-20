const express = require("express");
const router = express.Router();

const reviewController = require("../Controllers/reviewController.js");
const authenticate = require("../Middleware/authenticate.js");

router.post("/create",authenticate,reviewController.createReview);
router.get("/product/:productId",authenticate,reviewController.getAllReview);

module.exports=router;