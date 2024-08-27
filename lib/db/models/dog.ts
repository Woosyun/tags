import { Schema, models, model } from "mongoose";

const DogSchema = new Schema({
  name: String
});

const Dog = models.Dog || model('Dog', DogSchema);

export default Dog;