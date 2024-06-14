const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
   {
      author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      text: { type: String, required: true },
      postId: { type: Schema.Types.ObjectId, required: true },
   },
   { timestamps: true }
);

CommentSchema.virtual("timestampFormatted").get(function () {
   return this.createdAt.toLocaleString();
});

module.exports = mongoose.model("Comment", CommentSchema);
