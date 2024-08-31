import { auth } from "@/lib/auth";
import { createComment } from "@/lib/db/comment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user || !session.user.name) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { id, content } = await req.json();
    const newComment = {
      author: session.user!.name?.toString()!,
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