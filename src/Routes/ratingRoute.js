const express = require("express");
const router = express.Router();

const ratingController = require("../Controllers/ratingController.js");
const authenticate = require("../Middleware/authenticate.js");

router.post("/create",authenticate,ratingController.createRating);
router.get("/product/:productId",authenticate,ratingController.getAllRating);

module.exports=router;