const asyncHandler = require("express-async-handler");
const CommentsService = require("../services/comments_service");

const getAllComments = asyncHandler(async (req, res, next) => {
   const comments = await CommentsService.getAllComments();

   res.json(comments);
});

const getComment = asyncHandler(async (req, res, next) => {
   const { comment_id } = req.params;
   const comment = await CommentsService.getComment(comment_id);

   res.json(comment);
});

const createComment = asyncHandler(async (req, res, next) => {
   const { author_id, text, post_id } = req.body;
   await CommentsService.createComment();

   res.sendStatus(201);
});

const updateComment = asyncHandler(async (req, res, next) => {
   const { comment_id } = req.params;
   const { author_id, text, post_id } = req.body;
   await CommentsService.updateComment(author_id, text, post_id, comment_id);

   res.sendStatus(204);
});

const deleteComment = asyncHandler(async (req, res, next) => {
   const { comment_id } = req.params;
   await CommentsService.deleteComment(comment_id);

   res.sendStatus(204);
});

module.exports = {
   getAllComments,
   getComment,
   createComment,
   updateComment,
   deleteComment,
};
