const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const { AppError } = require("../utils/app_error");
const ValidationError = require("../utils/app_error").ValidationError;
const isValid = require("mongoose").Types.ObjectId.isValid;

const validateComment = [
   body("text", "Must provide text").trim().notEmpty().escape(),
   (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         const error = errors.array().map((err) => {
            return { message: err.msg };
         });
         return next(new ValidationError(error));
      }

      if (!isValid(req.body.postId)) {
         return next(new AppError("Invalid object id", 400));
      }

      next();
   },
];

const validatePost = [
   body("title", "Must provide a title").trim().notEmpty().escape(),
   body("text", "Must provide text").trim().notEmpty().escape(),
   body("isPublished").customSanitizer((value) => {
      return value === "true" ? true : false;
   }),
   (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         const error = errors.array().map((err) => {
            return { message: err.msg };
         });
         return next(new ValidationError(error));
      }

      if (!isValid(req.body.author)) {
         return next(new AppError("Invalid object id", 400));
      }

      next();
   },
];

const validateSignup = [
   body("name", "Must provide a name").trim().notEmpty().escape(),
   body("email", "Must provide an email")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("Must provide a valid email")
      .escape()
      .custom(async (value) => {
         const user = await User.findOne({ email: value }).exec();
         if (user) {
            throw new AppError("User with this email already exists", 409);
         }
         return true;
      }),
   body("password", "Must provide a password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must contain at least 8 characters")
      .escape(),
   body("isAuthor")
      .trim()
      .customSanitizer((value) => {
         return value === "true" ? true : false;
      })
      .escape(),
   (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         const error = errors.array().map((err) => {
            return { message: err.msg };
         });
         return next(new ValidationError(error));
      }

      next();
   },
];

const validateLogin = [
   body("email", "Must provide an email")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("Must provide a valid email")
      .escape(),
   body("password", "Must provide a password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must contain at least 8 characters")
      .escape(),
   (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         const error = errors.array().map((err) => {
            return { message: err.msg };
         });
         return next(new ValidationError(error));
      }

      next();
   },
];

module.exports = {
   validatePost,
   validateComment,
   validateSignup,
   validateLogin,
};
