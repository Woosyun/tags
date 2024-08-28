import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
  title: String,
  author: String,
  content: String,
  comments: [{ content: String, author: String, date: Date }],
  date: { type: Date, default: Date.now },
  tags: [String]
});

const Post = models.Post || model('Post', PostSchema);

export default Post;