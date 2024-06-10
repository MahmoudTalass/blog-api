const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
   title: { type: String, required: true },
   text: { type: String, required: true },
   timestamp: { type: Date, default: Date.now },
   publish_date: { type: Date },
   is_published: { type: Boolean, required: true },
});

PostSchema.virtual("timestamp_formatted").get(function () {
   return this.timestamp.toLocaleString();
});

PostSchema.virtual("publish_date_formatted").get(function () {
   return this.publish_date.toLocaleString();
});

module.exports = mongoose.model("Post", PostSchema);
