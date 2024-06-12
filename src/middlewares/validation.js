const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const { AppError } = require("../utils/app_error");
const ValidationError = require("../utils/app_error").ValidationError;

const validatePost = [
   body("title", "Must provide a title").trim().notEmpty().escape(),
   body("text", "Must provide a body text").trim().notEmpty(),
   body("isPublished", "Must specify if you would like the post to be published").customSanitizer(
      (value) => {
         if (value === "yes") return true;
         return false;
      }
   ),
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
      .customSanitizer((value) => {
         if (value === "yes") return true;
         return false;
      })
      .escape(),
   (res, req, next) => {
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
   (res, req, next) => {
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
   validateSignup,
   validateLogin,
};
