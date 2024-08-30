import { auth } from "@/lib/auth";
import { deletePost, getPost } from "@/lib/db/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await req.json();
  const targetPost = await getPost(id);
  if (targetPost.author !== session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    deletePost(id);
    return NextResponse.json({message: 'Post deleted successfully'}, {status: 200});
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}