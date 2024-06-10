const Post = require("../models/post");
const Comment = require("../models/comment");
const AppError = require("../utils/app_error");

class PostsService {
   async getAllPosts() {
      await Post.find().populate("author").exec();
   }

   async getPost(postId) {
      const [post, comments] = await Promise.all([
         Post.findById().populate("author").exec(),
         Comment.find({ post_id: postId }).populate("author").exec(),
      ]);

      if (post === null) {
         throw new AppError("Post not found", 404);
      }

      return {
         post,
         comments,
      };
   }

   async getPostComments(postId) {
      return await Comment.find({ post_id: postId }).exec();
   }

   async createPost(authorId, title, text, isPublished) {
      const post = new Post({
         author: authorId,
         title,
         text,
         is_published: isPublished,
      });

      if (isPublished === true) {
         post.publish_date = Date.now();
      }

      await post.save();
   }

   async updatePost(authorId, title, text, isPublished, postId) {
      const post = await findById(postId).exec();

      if (post === null) {
         throw new AppError("Post not found", 404);
      }

      const updatedPost = {
         author: authorId,
         title,
         text,
         is_published: isPublished,
      };

      await Post.findByIdAndUpdate(postId, { $set: updatedPost }, { runValidators: true }).exec();
   }

   async deletePost(postId) {
      const post = await findById(postId).exec();

      if (post === null) {
         throw new AppError("Post not found", 404);
      }

      await Post.findByIdAndDelete(postId).exec();
   }
}

module.exports = new PostsService();
