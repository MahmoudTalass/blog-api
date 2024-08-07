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
   const result = await UserService.getCurrentUserPosts(req.user.id);
   res.json(result);
});

const getCurrentUserComments = asyncHandler(async (req, res, next) => {
   const result = await UserService.getUserComments(req.user.id);
   res.json(result);
});

const getUserPosts = asyncHandler(async (req, res, next) => {
   const result = await UserService.getUserPosts(req.params.userId);
   res.json(result);
});

const getUserComments = asyncHandler(async (req, res, next) => {
   const result = await UserService.getUserComments(req.params.userId);
   res.json(result);
});

module.exports = {
   getCurrentUserInfo,
   getCurrentUserPosts,
   getCurrentUserComments,
   getUserPosts,
   getUserComments,
};
