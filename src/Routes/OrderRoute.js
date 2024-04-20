const express = require("express");
const router = express.Router();

const orderController = require("../Controllers/OrderController.js");
const authenticate = require("../Middleware/authenticate.js");

router.post("/",authenticate,orderController.createOrder);
router.get("/user",authenticate,orderController.orderHistory);
router.get("/:id",authenticate,orderController.findOrderById);

module.exports=router;