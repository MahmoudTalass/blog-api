const express = require("express");
const User = require("../models/user");
const router = express.Router();

const postsRouter = require("./posts");
const commentsRouter = require("./comments");
const authRouter = require("./auth");
const userRouter = require("./user");

router.use("/auth", authRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/user", userRouter);

module.exports = router;
