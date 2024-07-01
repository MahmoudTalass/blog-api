const Comment = require("../models/comment");
const Post = require("../models/post");
const AppError = require("../utils/app_error").AppError;
const isValid = require("mongoose").Types.ObjectId.isValid;

class CommentsService {
   async getAllComments() {
      return await Comment.find({})
         .populate("author", "name email isAuthor")
         .sort({ createdAt: -1, _id: 1 })
         .exec();
   }

   async getComment(commentId) {
      if (!isValid(commentId)) {
         throw new AppError("Comment not found", 404);
      }

      const comment = await Comment.findById(commentId)
         .populate("author", "name email isAuthor")
         .exec();

      if (comment === null) {
         throw new AppError("Comment not found", 404);
      }

      return comment;
   }

   async createComment(currentUserId, text, postId) {
      const comment = new Comment({
         author: currentUserId,
         text,
         postId: postId,
      });

      await comment.save();

      const populatedComment = await comment.populate("author", "name isAuthor");

      return populatedComment;
   }

   async updateComment(currentUserId, text, commentId) {
      if (!isValid(commentId)) {
         throw new AppError("Comment not found", 404);
      }

      const comment = await Comment.findById(commentId).exec();

      if (comment === null) {
         throw new AppError("Comment not found", 404);
      }

      // if the user isn't the author of the comment, then they don't have permission to update it.
      if (currentUserId !== comment.author.toString()) {
         throw new AppError("You do not have the permission to update this comment", 403);
      }

      comment.text = text;

      return await comment.save();
   }

   async deleteComment(currentUserId, commentId) {
      if (!isValid(commentId)) {
         throw new AppError("Comment not found", 404);
      }

      const comment = await Comment.findById(commentId).exec();

      if (comment === null) {
         throw new AppError("Comment not found", 404);
      }

      const post = await Post.findById(comment.postId.toString()).exec();

      if (post === null) {
         throw new AppError("This comment does not belong to a post and cannot be deleted.", 403);
      }

      // if current user isn't the author of the comment or the author of the post that this comment is under,
      // then they do not have the permission to delete the post.
      if (currentUserId !== comment.author.toString() || currentUserId !== post.author.toString()) {
         throw new AppError("You do not have the permission to delete this comment", 403);
      }

      Comment.deleteOne({ _id: commentId }).exec();
   }
}

module.exports = new CommentsService();
