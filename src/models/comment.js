const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
   author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
   text: { type: String, required: true },
   timestamp: { type: Date, default: Date.now },
   postId: { type: Schema.Types.ObjectId, required: true },
});

CommentSchema.virtual("timestampFormatted").get(function () {
   return this.timestamp.toLocaleString();
});

module.exports = mongoose.model("Comment", CommentSchema);
