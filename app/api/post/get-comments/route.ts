import { getComments } from "@/lib/db/comment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    const comments = await getComments(id);
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}