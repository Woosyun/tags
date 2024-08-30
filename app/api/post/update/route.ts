import { auth } from "@/lib/auth";
import { getPost, updatePost } from "@/lib/db/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  const { id, content } = await req.json();
  const targetPost = await getPost(id);
  if (targetPost.author !== session.user!.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newDate = new Date(Date.now());
    await updatePost(id, content, newDate);

    return NextResponse.json({ message: 'Post updated' }, {status: 200});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}