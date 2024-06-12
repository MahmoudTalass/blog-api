const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts_controller");
const passport = require("passport");
const { isAuthor } = require("../middlewares/auth");

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
router.post(
   "/",
   passport.authenticate("jwt", { session: false }),
   isAuthor,
   postsController.createPost
);

/**
 * update a particular post
 */
router.put(
   "/:postId",
   passport.authenticate("jwt", { session: false }),
   isAuthor,
   postsController.updatePost
);

/**
 * delete a particular post
 */
router.delete(
   "/:postId",
   passport.authenticate("jwt", { session: false }),
   isAuthor,
   postsController.deletePost
);

module.exports = router;
