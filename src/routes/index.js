const express = require("express");
const router = express.Router();

const postsRouter = require("./posts");
const commentsRouter = require("./comments");
const authRouter = require("./auth");
const userRouter = require("./user");

router.use("/auth", authRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/users", userRouter);

module.exports = router;
