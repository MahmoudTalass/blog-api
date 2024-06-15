const Post = require("../models/post");
const Comment = require("../models/comment");
const { AppError } = require("../utils/app_error");
const isValid = require("mongoose").Types.ObjectId.isValid;

class UserService {
   async getCurrentUserPosts(userId) {
      return await Post.find({ author: userId })
         .populate("author", "name email isAuthor")
         .sort({ createdAt: -1, _id: 1 })
         .exec();
   }
   async getUserPosts(userId) {
      if (!isValid(userId)) {
         throw new AppError("User not found", 404);
      }

      return await Post.find({ author: userId, isPublished: true })
         .populate("author", "name email isAuthor")
         .sort({ createdAt: -1, _id: 1 })
         .exec();
   }

   async getUserComments(userId) {
      if (!isValid(userId)) {
         throw new AppError("User not found", 404);
      }

      return await Comment.find({ author: userId })
         .populate("author", "name email isAuthor")
         .sort({ createdAt: -1, _id: 1 })
         .exec();
   }
}

module.exports = new UserService();
