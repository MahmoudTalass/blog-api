const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const { checkNotAuthenticated } = require("../middlewares/auth");

router.get("/signup", checkNotAuthenticated, authController.signup);

router.get("/login", checkNotAuthenticated, authController.login);

module.exports = router;
