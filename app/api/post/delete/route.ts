import { deletePost } from "@/lib/db/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    deletePost(id);
    return NextResponse.json({message: 'Post deleted successfully'}, {status: 200});
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}