const asyncHandler = require("express-async-handler");
const UserService = require("../services/user_service");

const getCurrentUserInfo = (req, res, next) => {
   const user = req.user;
   res.json({
      name: user.name,
      email: user.email,
      isAuthor: user.isAuthor,
      id: user.id,
   });
};

const getCurrentUserPosts = asyncHandler(async (req, res, next) => {
   const published = req.query.published;
   return await UserService.getCurrentUserPosts(req.user.id, published);
});

const getCurrentUserComments = asyncHandler(async (req, res, next) => {
   return await UserService.getUserComments(req.user.id);
});

const getUserPosts = asyncHandler(async (req, res, next) => {
   return await UserService.getUserPosts(req.params.userId);
});

const getUserComments = asyncHandler(async (req, res, next) => {
   return await UserService.getUserComments(req.params.userId);
});

module.exports = {
   getCurrentUserInfo,
   getCurrentUserPosts,
   getCurrentUserComments,
   getUserPosts,
   getUserComments,
};
