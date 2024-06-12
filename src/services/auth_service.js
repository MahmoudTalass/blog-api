const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/app_error");

class AuthService {
   async signup(name, email, password, isAuthor) {
      const hash = await bcrypt.hash(password, 10);
      const user = new User({
         name,
         email,
         password: hash,
         isAuthor,
      });

      return await newUser.save();
   }

   createToken(user) {
      const oneWeek = 60 * 60 * 60 * 24 * 7;

      const payload = {
         id: user.id,
         exp: oneWeek,
         author: user.isAuthor,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return token;
   }
}

module.exports = new AuthService();
