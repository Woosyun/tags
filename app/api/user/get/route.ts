import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  // console.log('(api/user/get)session: ', session);
  
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  return NextResponse.json({ user: JSON.stringify(session.user) }, { status: 200 });
}