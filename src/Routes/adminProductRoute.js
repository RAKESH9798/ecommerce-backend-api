const express = require("express");
const router = express.Router();

const productController = require("../Controllers/productController.js");
const authenticate = require("../Middleware/authenticate.js");

router.post("/",authenticate,productController.createProduct);
router.post("/creates",authenticate,productController.createMultipleProduct);
router.delete("/:id",authenticate,productController.deleteProduct);
router.put("/:id",authenticate,productController.updateProduct);

module.exports=router;