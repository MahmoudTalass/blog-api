const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const { checkNotAuthenticated } = require("../middlewares/auth");

router.post("/signup", checkNotAuthenticated, authController.signup);

router.post("/login", checkNotAuthenticated, authController.login);

module.exports = router;
