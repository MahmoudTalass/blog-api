const Comment = require("../models/comment");
const AppError = require("../utils/app_error").AppError;
const isValid = require("mongoose").Types.ObjectId.isValid;

class CommentsService {
   async getAllComments() {
      return await Comment.find().populate("author", "name email isAuthor").exec();
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

   async createComment(authorId, text, postId) {
      const comment = new Comment({
         author: authorId,
         text,
         postId: postId,
      });

      return await comment.save();
   }

   async updateComment(currentUserId, authorId, text, postId, commentId) {
      if (!isValid(commentId)) {
         throw new AppError("Comment not found", 404);
      }

      if (currentUserId !== authorId) {
         throw new AppError("You do not have the permission to update this comment", 403);
      }

      const updatedComment = {
         text,
         postId: postId,
      };

      const comment = await Comment.findByIdAndUpdate(
         commentId,
         { $set: updatedComment },
         { runValidators: true, new: true }
      ).exec();

      if (comment === null) {
         throw new AppError("Comment not found", 404);
      }

      return comment;
   }

   async deleteComment(currentUserId, authorId, commentId) {
      if (!isValid(commentId)) {
         throw new AppError("Comment not found", 404);
      }

      if (currentUserId !== authorId) {
         throw new AppError("You do not have the permission to update this comment", 403);
      }
      const comment = await Post.findByIdAndDelete(commentId).exec();

      if (comment === null) {
         throw new AppError("Comment not found", 404);
      }
   }
}

module.exports = new CommentsService();
