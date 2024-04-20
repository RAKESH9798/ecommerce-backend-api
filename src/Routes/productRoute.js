const express = require("express");
const router = express.Router();

const productController = require("../Controllers/productController.js");
const authenticate = require("../Middleware/authenticate.js");

router.post("/create",authenticate,productController.createProduct);
router.delete("/delete/:id",authenticate,productController.deleteProduct);
router.put("/update/:id",authenticate,productController.updateProduct);
router.post("/creates",authenticate,productController.createMultipleProduct);
router.get("/id/:id",authenticate,productController.findProductById);
router.get("/",authenticate,productController.getAllProducts);

module.exports=router;