const express = require("express");
const router = express.Router();

const authenticate = require("../Middleware/authenticate.js");
const paymentController=require("../Controllers/paymentController.js");

router.post("/:id",authenticate,paymentController.createPaymentLink);
router.get("/",authenticate,paymentController.updatePaymentInformation);


module.exports=router;