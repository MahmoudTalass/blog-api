const asyncHandler = require("express-async-handler");
const { AppError } = require("../utils/app_error");
const jwt = require("jsonwebtoken");

const isAuthor = asyncHandler((req, res, next) => {
   if (req.user.isAuthor) {
      next();
   } else {
      throw new AppError("Unauthorized access", 403);
   }
});

const checkNotAuthenticated = asyncHandler((req, res, next) => {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];

   if (token === null) {
      return next();
   }

   throw new AppError("You are already logged in", 403);
});

module.exports = {
   isAuthor,
   checkNotAuthenticated,
};
