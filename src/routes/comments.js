const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments_controller");
const passport = require("passport");

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
router.post(
   "/",
   passport.authenticate("jwt", { session: false }),
   commentsController.createComment
);

/**
 * update a particular post
 */
router.put(
   "/:commentId",
   passport.authenticate("jwt", { session: false }),
   commentsController.updateComment
);

/**
 * delete a particular post
 */
router.delete(
   "/:commentId",
   passport.authenticate("jwt", { session: false }),
   commentsController.deleteComment
);

module.exports = router;
