import { CommentT, PostCardT, PostT } from "../types";
import connectToDB from "./connect";
import Post from "./models/post";

export const getPost = async (id: string): Promise<PostT> => {
  try {
    await connectToDB();
    const post = await Post.findById(id).exec();

    // console.log('(getPost) post: ', post);
    
    return post;
  } catch (error: any) {
    throw new Error('(getPost)'+error.message);
  }
}
export const createPost = async (post: PostT): Promise<void> => {
  try {
    // console.log('(createPost) post: ', post);
    await connectToDB();
    await Post.create(post);
  } catch (error: any) {
    throw new Error('(createPost)->'+error.message);
  }
}
export const deletePost = async (id: string): Promise<void> => {
  try {
    await connectToDB();
    await Post.findByIdAndDelete(id).exec();
  } catch (error: any) {
    throw new Error('(deletePost)->'+error.message);
  }
}
export const updatePost = async (id: string, content: string, date: Date): Promise<void> => {
  try {
    await connectToDB();
    console.log('(updatePost) id, content, date: ', id, content, date);
    const newPost = await Post.findByIdAndUpdate(id, { content: content, lastModified: date }).exec();
    console.log('(updatePost) new post: ', newPost);
  } catch (error: any) {
    throw new Error('(updatePost)->'+error.message);
  }
}

export const getPostCards = async (
  tags: string[], 
  pageNumber: number,
  pageSize: number
): Promise<PostCardT[]> => {
  try {
    await connectToDB();

    const query = tags.length > 0 ? { tags: { $all: tags } } : {};
    const projection = {
      _id: 1,
      title: 1,
      author: 1,
      lastModified: 1,
      tags: 1
    };
    const skip = pageNumber > 0 ? (pageNumber - 1) * pageSize : 0;
    const posts = await Post.find(query, projection)
      .skip(skip)
      .limit(pageSize)
      .exec();
    
    // console.log('(getPostCards) posts: ', posts[0]);

    return posts;
  } catch (error: any) {
    throw new Error('(getPostCards) ' + error.message);
  }
}