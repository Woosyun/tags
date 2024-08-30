import { updatePost } from "@/lib/db/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, content } = await req.json();

    const newDate = new Date(Date.now());
    
    await updatePost(id, content, newDate);

    return NextResponse.json({ message: 'Post updated' }, {status: 200});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}