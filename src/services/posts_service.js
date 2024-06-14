const Post = require("../models/post");
const Comment = require("../models/comment");
const AppError = require("../utils/app_error").AppError;
const isValid = require("mongoose").Types.ObjectId.isValid;

class PostsService {
   async getAllPosts() {
      return await Post.find({ isPublished: true })
         .populate("author", "name email isAuthor")
         .exec();
   }

   async getPost(postId) {
      if (!isValid(postId)) {
         throw new AppError("Post not found", 404);
      }

      const [post, comments] = await Promise.all([
         Post.find({ postId, isPublished: true }).populate("author", "name email isAuthor").exec(),
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
      if (!isValid(postId)) {
         throw new AppError("Post not found", 404);
      }

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
      if (!isValid(postId)) {
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

      const post = await Post.findByIdAndUpdate(
         postId,
         { $set: updatedPost },
         { runValidators: true }
      ).exec();

      if (post === null) {
         throw new AppError("Post not found", 404);
      }
   }

   async deletePost(currentUserId, authorId, postId) {
      if (!isValid(postId)) {
         throw new AppError("Post not found", 404);
      }

      if (currentUserId !== authorId) {
         throw new AppError("You do not have the permission to update this post", 403);
      }

      const session = await Post.startSession();

      try {
         session.startTransaction();

         const post = await Post.findByIdAndDelete(postId, { session }).exec();

         if (post === null) {
            throw new AppError("Post not found", 404);
         }

         await Comment.deleteMany({ postId }, { session }).exec();

         await session.commitTransaction();
      } catch (error) {
         await session.abortTransaction();
         throw error;
      } finally {
         await session.endSession();
      }
   }
}

module.exports = new PostsService();
