const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true, lowercase: true },
   password: { type: String, required: true },
   is_author: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", UserSchema);
