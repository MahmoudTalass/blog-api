const Post = require("../models/post");
const Comment = require("../models/comment");

class PostsService {
   async getAllPosts() {
      return await Post.find().populate("author").exec();
   }

   async getPost(postId) {
      return await Post.findById().populate("author").exec();
   }

   async getPostComments(postId) {
      return await Comment.find({ post_id: postId }).exec();
   }

   async createPost(authorId, title, text, isPublished) {
      const post = new Post({
         author: authorId,
         title,
         text,
         is_published: isPublished,
      });

      if (isPublished === true) {
         post.publish_date = Date.now();
      }

      await post.save();
   }

   async updatePost(authorId, title, text, isPublished, postId) {
      const post = {
         author: authorId,
         title,
         text,
         is_published: isPublished,
      };

      await Post.findByIdAndUpdate(postId, { $set: post }).exec();
   }

   async updatePost(authorId, title, text, isPublished, postId) {
      const post = {
         author: authorId,
         title,
         text,
         is_published: isPublished,
      };

      await Post.findByIdAndUpdate(postId, { $set: post }).exec();
   }

   async deletePost(postId) {
      await Post.findByIdAndDelete(postId).exec();
   }
}

module.exports = new PostsService();
