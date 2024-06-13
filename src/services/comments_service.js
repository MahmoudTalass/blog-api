const Comment = require("../models/comment");
const AppError = require("../utils/app_error").AppError;

class CommentsService {
   async getAllComments() {
      await Comment.find().populate("author", "name email isAuthor").exec();
   }

   async getComment(commentId) {
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

      await comment.save();
   }

   async updateComment(currentUserId, authorId, text, postId, commentId) {
      const comment = await Comment.findById(commentId).exec();

      if (comment === null) {
         throw new AppError("Comment not found", 404);
      }

      if (currentUserId !== authorId) {
         throw new AppError("You do not have the permission to update this comment", 403);
      }

      const updatedComment = {
         text,
         postId: postId,
      };

      await Comment.findByIdAndUpdate(
         commentId,
         { $set: updatedComment },
         { runValidators: true }
      ).exec();
   }

   async deleteComment(currentUserId, authorId, commentId) {
      const comment = await Comment.findById(commentId).exec();

      if (comment === null) {
         throw new AppError("Comment not found", 404);
      }

      if (currentUserId !== authorId) {
         throw new AppError("You do not have the permission to delete this comment", 403);
      }

      await Post.findByIdAndDelete(commentId).exec();
   }
}

module.exports = new CommentsService();
