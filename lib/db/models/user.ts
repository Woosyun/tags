import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: {type: String, unique: true},
  email: String,
  password: String
})

const User = models.User || model('User', UserSchema);

export default User;