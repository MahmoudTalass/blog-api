const PostsService = require("../services/posts_service");
const asyncHandler = require("express-async-handler");
const validatePost = require("../middlewares/validation");

const getAllPosts = asyncHandler(async (req, res, next) => {
   const posts = await PostsService.getAllPosts();

   res.json(posts);
});

const getPost = asyncHandler(async (req, res, next) => {
   const { post_id } = req.params;
   const post = await PostsService.getPost(post_id);

   res.json(post);
});

const getPostComments = asyncHandler(async (req, res, next) => {
   const { post_id } = req.params;
   const comments = await PostsService.getPostComments(post_id);

   res.json(comments);
});

const createPost = [
   ...validatePost,
   asyncHandler(async (req, res, next) => {
      const { author_id, title, text, is_published } = req.body;
      await PostsService.createPost(author_id, title, text, is_published);

      res.sendStatus(201);
   }),
];

const updatePost = [
   validatePost,
   asyncHandler(async (req, res, next) => {
      const { post_id } = req.params;
      const { author_id, title, text, is_published } = req.body;
      await PostsService.updatePost(author_id, title, text, is_published, post_id);
   }),
   res.sendStatus(200),
];

const deletePost = asyncHandler(async (req, res, next) => {
   const { post_id } = req.params;
   await PostsService.deletePost(post_id);

   res.sendStatus(204);
});

module.exports = { getAllPosts, getPost, getPostComments, createPost, updatePost, deletePost };
