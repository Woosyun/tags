import { Schema, models, model } from "mongoose";

const KittenSchema = new Schema({
  name: String
});

const Kitten = models.Kitten || model('Kitten', KittenSchema);

export default Kitten;