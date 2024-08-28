import { PostCardT, PostT } from "../types";
import connectToDB from "./connect";
import Post from "./models/post";

export const getPost = async (id: string): Promise<PostT> => {
  try {
    await connectToDB();
    const post = await Post.findOne({ objectId: id });
    
    return post;
  } catch (error: any) {
    throw new Error('(getPost)'+error.message);
  }
}

export const getPostCards = async (
  tags: string[], 
  pageNumber: number,
  pageSize: number
): Promise<PostCardT[]> => {
  try {
    await connectToDB();
    
    const skip = pageNumber > 0 ? (pageNumber - 1) * pageSize : 0; // Calculate how many documents to skip
    const posts = await Post.find(
      { tags: { $all: tags } },
      {
        _id: 1,
        title: 1,
        description: 1,
        lastModified: 1,
        user: 1,
      })
      .skip(skip)
      .limit(pageSize);

    return posts;
  } catch (error: any) {
    throw new Error('(getPostCards) ' + error.message);
  }
}