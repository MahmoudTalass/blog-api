const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const passport = require("passport");

/**
 * retrieve current user info
 */
router.get(
   "/me",
   passport.authenticate("jwt", { session: false }),

   userController.getCurrentUserInfo
);

/**
 * retrieve all posts from current user
 */
router.get(
   "/me/posts",
   passport.authenticate("jwt", { session: false }),
   userController.getUserPosts
);

/**
 * retrieve all comments by from current user
 */
router.get(
   "/me/comments",
   passport.authenticate("jwt", { session: false }),
   userController.getUserPosts
);

/**
 * retrieve all comments by from a particular user
 */
router.get("/:userId/comments", userController.getUserPosts);

/**
 * retrieve all posts by from a particular user
 */
router.get("/:userId/posts", userController.getUserPosts);

module.exports = router;
