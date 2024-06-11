const Comment = require("../models/comment");
const AppError = require("../utils/app_error").AppError;

class CommentsService {
   async getAllComments() {
      await Comment.find().populate("author").exec();
   }

   async getComment(commentId) {
      const comment = await Comment.findById(commentId);

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

   async updateComment(authorId, text, postId, commentId) {
      const comment = await Comment.findById(commentId).exec();

      if (comment === null) {
         throw new AppError("Comment not found", 404);
      }

      const updatedComment = {
         author: authorId,
         text,
         postId: postId,
      };

      await Comment.findByIdAndUpdate(
         commentId,
         { $set: updatedComment },
         { runValidators: true }
      ).exec();
   }

   async deleteComment(commentId) {
      const comment = await Comment.findById(commentId).exec();

      if (comment === null) {
         throw new AppError("Comment not found", 404);
      }

      await Post.findByIdAndDelete(commentId).exec();
   }
}

module.exports = new CommentsService();
