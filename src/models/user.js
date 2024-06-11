const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true, lowercase: true },
   password: { type: String, required: true },
   isAuthor: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", UserSchema);
