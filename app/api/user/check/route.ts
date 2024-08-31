import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  // console.log('(api/user/check) session: ', session);
  if (session && session?.user && session.user.name === session.user.email ) {
    return NextResponse.json({redirect: '/signup'}, { status: 302 });
  }

  return NextResponse.json({ message: 'no problem' }, { status: 200 });
}