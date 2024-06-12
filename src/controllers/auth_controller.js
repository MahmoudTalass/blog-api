const asyncHandler = require("express-async-handler");
const AuthService = require("../services/auth_service");
const passport = require("passport");
const { AppError } = require("../utils/app_error");
const { validateSignup, validateLogin } = require("../middlewares/validation");

const signup = [
   ...validateSignup,
   asyncHandler(async (req, res, next) => {
      const { name, email, password, isAuthor } = req.body;
      const user = await AuthService.signup(name, email, password, isAuthor);
      const token = AuthService.createToken(user);

      res.sendStatus(201).json({ user, token });
   }),
];

const login = [
   ...validateLogin,
   asyncHandler(async (req, res, next) => {
      passport.authenticate("local", { session: false }, function (err, user, info, status) {
         if (err || !user) {
            return next(new AppError("Failed to authenticate", 401));
         }

         const token = AuthService.createToken(user);

         req.login(user, { session: false });

         res.json({ user, token });
      })(req, res, next);
   }),
];

module.exports = {
   signup,
   login,
};
