const PostsService = require("../services/posts_service");
const asyncHandler = require("express-async-handler");
const { validatePost } = require("../middlewares/validation");

const getAllPosts = asyncHandler(async (req, res, next) => {
   const posts = await PostsService.getAllPosts();

   res.json(posts);
});

const getPost = asyncHandler(async (req, res, next) => {
   const { postId } = req.params;
   const post = await PostsService.getPost(postId);

   res.json(post);
});

const getPostComments = asyncHandler(async (req, res, next) => {
   const { postId } = req.params;
   const comments = await PostsService.getPostComments(postId);

   res.json(comments);
});

const createPost = [
   ...validatePost,
   asyncHandler(async (req, res, next) => {
      const authorId = req.user.id;
      const { title, text, isPublished } = req.body;
      const post = await PostsService.createPost(authorId, title, text, isPublished);

      res.status(201).json(post);
   }),
];

const updatePost = [
   validatePost,
   asyncHandler(async (req, res, next) => {
      const currentUserId = req.user.id;
      const { postId } = req.params;
      const { authorId, title, text, isPublished } = req.body;

      const post = await PostsService.updatePost(
         currentUserId,
         authorId,
         title,
         text,
         isPublished,
         postId
      );

      res.json(post);
   }),
];

const deletePost = asyncHandler(async (req, res, next) => {
   const currentUserId = req.user.id;
   const { authorId } = req.body;
   const { postId } = req.params;
   await PostsService.deletePost(currentUserId, authorId, postId);

   res.sendStatus(204);
});

module.exports = { getAllPosts, getPost, getPostComments, createPost, updatePost, deletePost };
