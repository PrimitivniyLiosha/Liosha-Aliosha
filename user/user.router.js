const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get('/allusers', userController.allusers)

module.exports = router;