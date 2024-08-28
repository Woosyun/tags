import mongoose from "mongoose"

let isConnected = false;

const connectToDB = async () => {
  try {
    mongoose.set('strictQuery', true);

    if (isConnected) {
      // console.log('MongoDB is already connected');
      return;
    }
    await mongoose.connect('mongodb://localhost:27017/test');

    isConnected = true;
    console.log("(connect.ts) MongoDB connected");
  } catch (error: any) {
    console.log('cannot connect to db : ', error.message);
  }
}

export default connectToDB;