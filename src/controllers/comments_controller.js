const asyncHandler = require("express-async-handler");
const CommentsService = require("../services/comments_service");
const { validateComment } = require("../middlewares/validation");

const getAllComments = asyncHandler(async (req, res, next) => {
   const comments = await CommentsService.getAllComments();

   res.json(comments);
});

const getComment = asyncHandler(async (req, res, next) => {
   const { commentId } = req.params;
   const comment = await CommentsService.getComment(commentId);

   res.json(comment);
});

const createComment = [
   ...validateComment,
   asyncHandler(async (req, res, next) => {
      const authorId = req.user.id;
      const { text, postId } = req.body;
      const comment = await CommentsService.createComment(authorId, text, postId);

      res.status(201).json(comment);
   }),
];

const updateComment = [
   ...validateComment,
   asyncHandler(async (req, res, next) => {
      const currentUserId = req.user.id;
      const { commentId } = req.params;
      const { authorId, text } = req.body;
      const comment = await CommentsService.updateComment(currentUserId, authorId, text, commentId);

      res.json(comment);
   }),
];

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
