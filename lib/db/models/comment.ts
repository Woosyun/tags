import { Schema, models, model } from "mongoose";

const CommentSchema = new Schema({
  author: String,
  content: String,
  lastModified: { type: Date, default: Date.now },
  postId: String,
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;