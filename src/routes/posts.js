const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts_controller");

/**
 * retrieve all posts
 */
router.get("/", postsController.getAllPosts);

/**
 * retrieve a particular post
 */
router.get("/:postId", postsController.getPost);

/**
 * retrieve all comments for a particular post
 */
router.get("/:postId/comments", postsController.getPostComments);

/**
 * create a new post
 */
router.post("/", postsController.createPost);

/**
 * update a particular post
 */
router.put("/:postId", postsController.updatePost);

/**
 * delete a particular post
 */
router.delete("/:postId", postsController.deletePost);

module.exports = router;
