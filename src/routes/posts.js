const express = require("express");
const router = express.Router();

/**
 * Endpoint to retrieve all posts
 */
router.get("/");

/**
 * Endpoint to retrieve all comments for a particular post
 */
router.get("/:postId/comments");

/**
 * Endpoint to create a new post
 */
router.post("/");

/**
 * Endpoint to update a particular post
 */
router.put("/:postId");

/**
 * Endpoint to delete a particular post
 */
router.delete("/:postId");

module.exports = router;
