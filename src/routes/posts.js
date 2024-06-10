const express = require("express");
const router = express.Router();

/**
 * retrieve all posts
 */
router.get("/");

/**
 * retrieve a particular post
 */
router.get("/:postId");

/**
 * retrieve all comments for a particular post
 */
router.get("/:postId/comments");

/**
 * create a new post
 */
router.post("/");

/**
 * update a particular post
 */
router.put("/:postId");

/**
 * delete a particular post
 */
router.delete("/:postId");

module.exports = router;
