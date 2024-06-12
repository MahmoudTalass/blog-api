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

   if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
         if (err) {
            next();
         }
         throw new AppError("You are already logged in", 403);
      });
   }

   return next();
});

module.exports = {
   isAuthor,
   checkNotAuthenticated,
};
