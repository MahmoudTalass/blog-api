const PostsService = require("../services/posts_service");
const asyncHandler = require("express-async-handler");

const getAllPosts = asyncHandler(async (req, res, next) => {
   return await PostsService.getAllPosts();
});

const getPost = asyncHandler(async (req, res, next) => {
   const { post_id } = req.params;
   return await PostsService.getPost(post_id);
});

const getPostComments = asyncHandler(async (req, res, next) => {
   const { post_id } = req.params;
   return await PostsService.getPostComments(post_id);
});

const createPost = asyncHandler(async (req, res, next) => {
   const { author_id, title, text, is_published } = req.body;
   return await PostsService.createPost(author_id, title, text, is_published);
});

const updatePost = asyncHandler(async (req, res, next) => {
   const { post_id } = req.params;
   const { author_id, title, text, is_published } = req.body;
   return await PostsService.updatePost(author_id, title, text, is_published, post_id);
});

const deletePost = asyncHandler(async (req, res, next) => {
   const { post_id } = req.params;
   return await PostsService.deletePost(post_id);
});

module.exports = { getAllPosts, getPost, getPostComments, createPost, updatePost };
