const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController.js");

router.get("/profile", userController.getUserProfile);
router.get("/", userController.getAllUsers);


module.exports = router;
