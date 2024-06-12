const Post = require("../models/post");
const Comment = require("../models/comment");

class UserService {
   async getUserPosts(userId) {
      return await Post.find({ author: userId });
   }

   async getUserComments(userId) {
      return await Comment.find({ author: userId });
   }
}

module.exports = new UserService();
