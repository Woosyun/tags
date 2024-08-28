import { getPostCards } from "@/lib/db/post";
import { PostCardT } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { tags, pageNumber, pageSize } = await req.json();

    const postCards: PostCardT[] = await getPostCards(tags, pageNumber, pageSize);

    return NextResponse.json({ postCards: JSON.stringify(postCards) }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}