const Post = require("../models/post");
const Comment = require("../models/comment");
const AppError = require("../utils/app_error").AppError;

class PostsService {
   async getAllPosts() {
      return await Post.find({}).populate("author").exec();
   }

   async getPost(postId) {
      const [post, comments] = await Promise.all([
         Post.findById().populate("author").exec(),
         Comment.find({ postId: postId }).populate("author").exec(),
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
      return await Comment.find({ postId: postId }).exec();
   }

   async createPost(authorId, title, text, isPublished) {
      const post = new Post({
         author: authorId,
         title,
         text,
         isPublished,
      });

      if (isPublished === true) {
         post.publishDate = Date.now();
      }

      await post.save();
   }

   async updatePost(title, text, isPublished, postId) {
      const post = await Post.findById(postId).exec();

      if (post === null) {
         throw new AppError("Post not found", 404);
      }

      const updatedPost = {
         title,
         text,
         isPublished,
      };

      await Post.findByIdAndUpdate(postId, { $set: updatedPost }, { runValidators: true }).exec();
   }

   async deletePost(postId) {
      const post = await Post.findById(postId).exec();

      if (post === null) {
         throw new AppError("Post not found", 404);
      }

      await Post.findByIdAndDelete(postId).exec();
   }
}

module.exports = new PostsService();
