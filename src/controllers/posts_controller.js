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
      const { authorId, title, text, isPublished } = req.body;
      await PostsService.createPost(authorId, title, text, isPublished);

      res.sendStatus(201);
   }),
];

const updatePost = [
   validatePost,
   asyncHandler(async (req, res, next) => {
      const { postId } = req.params;
      const { authorId, title, text, isPublished } = req.body;
      await PostsService.updatePost(authorId, title, text, isPublished, postId);

      res.sendStatus(204);
   }),
];

const deletePost = asyncHandler(async (req, res, next) => {
   const { postId } = req.params;
   await PostsService.deletePost(postId);

   res.sendStatus(204);
});

module.exports = { getAllPosts, getPost, getPostComments, createPost, updatePost, deletePost };
