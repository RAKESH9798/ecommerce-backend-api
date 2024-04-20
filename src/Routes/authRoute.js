const express = require("express");
const router = express.Router();
const authControler = require("../Controllers/authController");

router.post("/signup",authControler.register);
router.post("/login",authControler.login);

module.exports=router;