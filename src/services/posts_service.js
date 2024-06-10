const Post = require("../models/post");
const Comment = require("../models/comment");
const AppError = require("../utils/app_error");

class PostsService {
   async getAllPosts() {
      try {
         await Post.find().populate("author").exec();
      } catch (error) {
         new AppError("Failed to retrieve posts");
      }
   }

   async getPost(postId) {
      const [post, comments] = await Promise.all([
         Post.findById().populate("author").exec(),
         Comment.find({ post_id: postId }).populate("author").exec(),
      ]);

      if (post === null) {
         throw new AppError("Post not found", 404);
      }

      return {
         post,
         comments,
      };
   }

   async getPostComments(postId) {
      const comments = await Comment.find({ post_id: postId }).exec();

      if (comments.length === 0) {
         throw new AppError("No comments were found for this post", 404);
      }
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
      const post = await findById(postId).exec();

      if (post === null) {
         throw new AppError("Invalid resource identifier");
      }

      const updatedPost = {
         author: authorId,
         title,
         text,
         is_published: isPublished,
      };

      await Post.findByIdAndUpdate(postId, { $set: updatedPost }, { runValidators: true }).exec();
   }

   async deletePost(postId) {
      const post = await findById(postId).exec();

      if (post === null) {
         throw new AppError("Invalid resource identifier");
      }

      await Post.findByIdAndDelete(postId).exec();
   }
}

module.exports = new PostsService();
