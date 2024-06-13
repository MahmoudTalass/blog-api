const Post = require("../models/post");
const Comment = require("../models/comment");
const AppError = require("../utils/app_error").AppError;

class PostsService {
   async getAllPosts() {
      return await Post.find({ isPublished: false })
         .populate("author", "name email isAuthor")
         .exec();
   }

   async getPost(postId) {
      const [post, comments] = await Promise.all([
         Post.findById(postId).populate("author", "name email isAuthor").exec(),
         Comment.find({ postId: postId }).populate("author", "name email isAuthor").exec(),
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
      return await Comment.find({ postId: postId })
         .populate("author", "name email isAuthor")
         .exec();
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

   async updatePost(currentUserId, authorId, title, text, isPublished, postId) {
      const post = await Post.findById(postId).exec();

      if (post === null) {
         throw new AppError("Post not found", 404);
      }

      if (currentUserId !== authorId) {
         throw new AppError("You do not have the permission to update this post", 403);
      }

      const updatedPost = {
         title,
         text,
         isPublished,
      };

      await Post.findByIdAndUpdate(postId, { $set: updatedPost }, { runValidators: true }).exec();
   }

   async deletePost(currentUserId, authorId, postId) {
      const post = await Post.findById(postId).exec();

      if (post === null) {
         throw new AppError("Post not found", 404);
      }

      if (currentUserId !== authorId) {
         throw new AppError("You do not have the permission to delete this post", 403);
      }

      const session = await Post.startSession();
      session.startTransaction();

      await Post.findByIdAndDelete(postId, { session }).exec();
      await Comment.deleteMany({ postId }, { session }).exec();

      await session.commitTransaction();
      await session.endSession();
   }
}

module.exports = new PostsService();
