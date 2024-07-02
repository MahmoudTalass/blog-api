const PostsService = require("../services/posts_service");
const asyncHandler = require("express-async-handler");
const { validatePost } = require("../middlewares/validation");

const getAllPosts = asyncHandler(async (req, res, next) => {
   const posts = await PostsService.getAllPosts();

   res.json(posts);
});

const getPost = asyncHandler(async (req, res, next) => {
   const { postId } = req.params;
   const currentUserId = req.user.id;
   // this query parameter indicates whether comments of a post should also
   // be retrieved along with the post.
   const { comments } = req.query;
   /**
    * if user indicates they want comments along with the post, the json will contain
    * an object containing the post object and the comments array
    * {
    *    posts (object),
    *    comments (array)
    * }
    *
    * otherwise, the post is sent in the json by itself.
    * */
   const post = await PostsService.getPost(postId, currentUserId, comments);

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
      const currentUserId = req.user.id;
      const { title, text, isPublished } = req.body;
      const post = await PostsService.createPost(currentUserId, title, text, isPublished);

      res.status(201).json(post);
   }),
];

const updatePost = [
   validatePost,
   asyncHandler(async (req, res, next) => {
      const currentUserId = req.user.id;
      const { postId } = req.params;
      const updatedPost = {
         title: req.body.title,
         text: req.body.text,
         isPublished: req.body.isPublished,
      };

      if (req.body.publishDate) {
         updatedPost.publishDate = req.body.publishDate;
      }

      const post = await PostsService.updatePost(currentUserId, updatedPost, postId);

      res.json(post);
   }),
];

const deletePost = asyncHandler(async (req, res, next) => {
   const currentUserId = req.user.id;
   const { postId } = req.params;

   await PostsService.deletePost(currentUserId, postId);

   res.sendStatus(204);
});

module.exports = { getAllPosts, getPost, getPostComments, createPost, updatePost, deletePost };
