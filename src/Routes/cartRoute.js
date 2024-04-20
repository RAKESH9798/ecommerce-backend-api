const express = require("express");
const router = express.Router();

const cartController = require("../Controllers/cartController.js");
const authenticate = require("../Middleware/authenticate.js");

router.post("/create", authenticate, cartController.createCart);
router.get("/", authenticate, cartController.findUserCart);
router.put("/add", authenticate, cartController.addItemToCart);

module.exports = router;
