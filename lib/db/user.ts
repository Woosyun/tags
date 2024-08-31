import { UserT } from "../types";
import connectToDB from "./connect";
import User from "./models/user";

export const createUser = async (user: UserT) => {
  try {
    await connectToDB();
    await User.create(user);
  } catch (error: any) {
    throw new Error('(creatUser)'+error.message);
  }
}

export const isUserNameUnique = async (name: string): Promise<boolean> => {
  try {
    if (!name) return false;
    
    await connectToDB();
    const user = await User.findOne({ name });
    if (!!user) {
      return false;
    }
    return true;
  } catch (error: any) {
    throw new Error('(isUserNameUnique)'+error.message);
  }
}