const Post = require("../models/post");
const Comment = require("../models/comment");
const AppError = require("../utils/app_error").AppError;
const isValid = require("mongoose").Types.ObjectId.isValid;

class PostsService {
   async getAllPosts() {
      return await Post.find(
         { isPublished: true },
         {
            author: 1,
            title: 1,
            publishDate: 1,
         }
      )
         .populate("author", "name email isAuthor")
         .sort({ publishDate: -1, _id: 1 })
         .exec();
   }

   async getPost(postId, currentUserId, shouldGetComments) {
      if (!isValid(postId)) {
         throw new AppError("Post not found", 404);
      }

      // find the post with the given post id and if the author is equal to the current
      // user grab the post despite publish status and if the author of the post isn't
      // the current user, then only grab the post if its unpublished.
      const post = await Post.findOne({
         _id: postId,
         $or: [{ author: currentUserId }, { isPublished: true }],
      })
         .populate("author", "name email isAuthor")
         .exec();

      if (post === null) {
         throw new AppError("Post not found", 404);
      }

      let comments = null;
      if (shouldGetComments) {
         comments = await Comment.find({ postId: postId })
            .populate("author", "name email isAuthor")
            .sort({ createdAt: -1, _id: 1 })
            .exec();
      }

      return comments ? { post, comments } : post;
   }

   async getPostComments(postId) {
      if (!isValid(postId)) {
         throw new AppError("Post not found", 404);
      }

      return await Comment.find({ postId: postId })
         .populate("author", "name email isAuthor")
         .sort({ createdAt: -1, _id: 1 })
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

      return await post.save();
   }

   async updatePost(currentUserId, authorId, updatedPost, postId) {
      if (!isValid(postId)) {
         throw new AppError("Post not found", 404);
      }

      if (currentUserId !== authorId) {
         throw new AppError("You do not have the permission to update this post", 403);
      }

      const post = await Post.findByIdAndUpdate(postId, updatedPost, {
         runValidators: true,
         new: true,
      }).exec();

      if (post === null) {
         throw new AppError("Post not found", 404);
      }

      return post;
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
