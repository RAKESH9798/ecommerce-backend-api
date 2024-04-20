const express = require("express");
const router = express.Router();

const cartItemController = require("../Controllers/cartItemController.js");
const authenticate = require("../Middleware/authenticate.js");

router.get("/:id",authenticate,cartItemController.findCartItemById);
router.put("/:id", authenticate, cartItemController.updateCartItem);
router.delete("/:id", authenticate, cartItemController.removeCartItem);

module.exports = router;
