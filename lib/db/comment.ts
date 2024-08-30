import { CommentT } from "../types";
import connectToDB from "./connect";
import Comment from "./models/comment";

export async function getComments(postId: string): Promise<CommentT[]> {
  try {
    await connectToDB();
    const comments = await Comment.find({ postId }, { _id: 0, __v: 0 }).lean();
    return comments as CommentT[];
  } catch (error: any) {
    throw new Error('(getComments)->' + error.message);
  }
}

export async function createComment(comment: CommentT): Promise<void> {
  try {
    await connectToDB();
    await Comment.create(comment) as CommentT;
  } catch (error: any) {
    throw new Error('(createComment)->' + error.message);
  }
}