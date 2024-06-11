const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
   title: { type: String, required: true },
   text: { type: String, required: true },
   timestamp: { type: Date, default: Date.now },
   publishDate: { type: Date },
   isPublished: { type: Boolean, required: true },
});

PostSchema.virtual("timestampFormatted").get(function () {
   return this.timestamp.toLocaleString();
});

PostSchema.virtual("publishDateFormatted").get(function () {
   return this.publishDate.toLocaleString();
});

module.exports = mongoose.model("Post", PostSchema);
