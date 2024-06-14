const Post = require("../models/post");
const Comment = require("../models/comment");

class UserService {
   async getCurrentUserPosts(userId) {
      return await Post.find({ author: userId })
         .populate("author", "name email isAuthor")
         .sort({ createdAt: -1 })
         .exec();
   }
   async getUserPosts(userId) {
      return await Post.find({ author: userId, isPublished: true })
         .populate("author", "name email isAuthor")
         .sort({ createdAt: -1 })
         .exec();
   }

   async getUserComments(userId) {
      return await Comment.find({ author: userId })
         .populate("author", "name email isAuthor")
         .sort({ createdAt: -1 })
         .exec();
   }
}

module.exports = new UserService();
