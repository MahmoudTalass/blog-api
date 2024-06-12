const User = require("../models/user");
const bcrypt = require("bcrypt");
const AppError = require("../utils/app_error");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const Extractor = require("passport-jwt").ExtractJwt;

const localStrategyOpt = {
   usernameField: email,
   passwordField: password,
   session: false,
};

const localStrategy = new LocalStrategy(localStrategyOpt, async (username, password, done) => {
   const user = await User.findOne({ email: username }).exec();

   if (!user) {
      return done(null, false, { message: "Incorrect email" });
   }

   const match = await bcrypt.compare(password, user.password);

   if (!match) {
      return done(null, false, { message: "Incorrect password" });
   }

   return done(null, user);
});

const jwtStrategyOptions = {
   secretOrKey: process.env.JWT_SECRET,
   jwtFromRequest: Extractor.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new JwtStrategy(jwtStrategyOptions, async (jwtPayload, done) => {
   const user = await User.findById(jwtPayload.id);

   if (!user) {
      throw new AppError("User not found", 404);
   }

   done(null, user);
});

passport.use(localStrategy);
passport.use(jwtStrategy);
