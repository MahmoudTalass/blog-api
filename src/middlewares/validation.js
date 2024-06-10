const { body, validationResult } = require("express-validator");
const ValidationError = require("../utils/app_error").ValidationError;

const validatePost = [
   body("title", "Must provide a title").trim().notEmpty().escape(),
   body("text", "Must provide a body text").trim().notEmpty(),
   body("is_published", "Must specify if you would like the post to be published").customSanitizer(
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
         return next(new ValidationError(errors));
      }

      next();
   },
];

module.exports = {
   validatePost,
};
