const asyncHandler = require("express-async-handler");
const CommentsService = require("../services/comments_service");

const getAllComments = asyncHandler(async (req, res, next) => {
   const comments = await CommentsService.getAllComments();

   res.json(comments);
});

const getComment = asyncHandler(async (req, res, next) => {
   const { commentId } = req.params;
   const comment = await CommentsService.getComment(commentId);

   res.json(comment);
});

const createComment = asyncHandler(async (req, res, next) => {
   const authorId = req.user.id;
   const { text, postId } = req.body;
   const comment = await CommentsService.createComment(authorId, text, postId);

   res.status(201).json(comment);
});

const updateComment = asyncHandler(async (req, res, next) => {
   const currentUserId = req.user.id;
   const { commentId } = req.params;
   const { authorId, text, postId } = req.body;
   const comment = await CommentsService.updateComment(
      currentUserId,
      authorId,
      text,
      postId,
      commentId
   );

   res.json(comment);
});

const deleteComment = asyncHandler(async (req, res, next) => {
   const currentUserId = req.user.id;
   const { commentId } = req.params;
   const { authorId } = req.body;

   await CommentsService.deleteComment(currentUserId, authorId, commentId);

   res.sendStatus(204);
});

module.exports = {
   getAllComments,
   getComment,
   createComment,
   updateComment,
   deleteComment,
};
