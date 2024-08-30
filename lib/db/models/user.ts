import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: {type: String, unique: true},
  email: {type: String, unique: true},
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
})

const User = models.User || model('User', UserSchema);

export default User;