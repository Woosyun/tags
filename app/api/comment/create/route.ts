import { createComment } from "@/lib/db/comment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, content } = await req.json();
    const newComment = {
      author: 'anonymous',
      content,
      postId: id,
      lastModified: new Date(Date.now()),
    };
    await createComment(newComment);
    return NextResponse.json({ comment: newComment }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}