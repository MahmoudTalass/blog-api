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
   await CommentsService.createComment(authorId, text, postId);

   res.sendStatus(201);
});

const updateComment = asyncHandler(async (req, res, next) => {
   const authorId = req.user.id;
   const { commentId } = req.params;
   const { text, postId } = req.body;
   await CommentsService.updateComment(authorId, text, postId, commentId);

   res.sendStatus(204);
});

const deleteComment = asyncHandler(async (req, res, next) => {
   const { commentId } = req.params;
   await CommentsService.deleteComment(commentId);

   res.sendStatus(204);
});

module.exports = {
   getAllComments,
   getComment,
   createComment,
   updateComment,
   deleteComment,
};
