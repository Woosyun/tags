import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function handler() {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  return NextResponse.json({ user: session.user }, { status: 200 });
}