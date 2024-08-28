import { getPost } from "@/lib/db/post";
import { PostT } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  try {
    const id = params.id;

    const post: PostT = await getPost(id);
    
    return NextResponse.json({ post: JSON.stringify(post) }, { status: 200});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}