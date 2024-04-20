const express = require("express");
const router = express.Router();

const adminOrderController = require("../Controllers/adminOrderController.js");
const authenticate = require("../Middleware/authenticate.js");

router.get("/",authenticate,adminOrderController.getAllOrders);
router.put("/:orderId/confirmed",authenticate,adminOrderController.confirmedOrder);
router.put("/:orderId/shipped",authenticate,adminOrderController.shippedOrder);
router.put("/:orderId/delivered",authenticate,adminOrderController.deliveredOrder);
router.put("/:orderId/canceled",authenticate,adminOrderController.canceledOrder);
router.put("/:orderId/deleted",authenticate,adminOrderController.deletedOrder);

module.exports=router;