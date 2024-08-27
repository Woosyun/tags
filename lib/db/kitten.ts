import connectToDB from "./connect";
import Dog from "./models/dog";
import Kitten from "./models/kitten";

export const test = async () => {
  await connectToDB();
  const testKittenExists = await Kitten.findOne({ name: 'test kitten' });
  if (!testKittenExists) {
    const kitten = await Kitten.create({ name: 'test kitten' });
    console.log(kitten);
  } else {
    console.log('kitten is already created');
    console.log(testKittenExists);
  }
}

export const test2 = async () => {
  await connectToDB();
  const isDogExists = await Dog.findOne({ name: 'test Dog' });
  if (!isDogExists) {
    const dog = await Dog.create({ name: 'test Dog' });
    console.log(dog);
  } else {
    console.log('Dog is already created');
    console.log(isDogExists);
  }
}