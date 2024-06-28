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

   async getPost(postId, authorId, currentUserId) {
      if (!isValid(postId)) {
         throw new AppError("Post not found", 404);
      }

      let post;

      let shouldGetAny = currentUserId === authorId ? true : false;

      if (shouldGetAny) {
         post = await Post.findOne({ _id: postId })
            .populate("author", "name email isAuthor")
            .exec();
      } else {
         post = await Post.findOne({ _id: postId, isPublished: true })
            .populate("author", "name email isAuthor")
            .exec();
      }

      if (post === null) {
         throw new AppError("Post not found", 404);
      }

      const comments = await Comment.find({ postId: postId })
         .populate("author", "name email isAuthor")
         .sort({ createdAt: -1, _id: 1 })
         .exec();

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
