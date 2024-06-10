const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments_controller");

/**
 * retrieve all posts
 */
router.get("/", commentsController.getAllComments);

/**
 * retrieve a particular post
 */
router.get("/:commentId", commentsController.getComment);

/**
 * create a new post
 */
router.post("/", commentsController.createComment);

/**
 * update a particular post
 */
router.put("/:commentId", commentsController.updateComment);

/**
 * delete a particular post
 */
router.delete("/:commentId", commentsController.deleteComment);

module.exports = router;
