import { auth } from "@/lib/auth";
import { createUser, isUserNameUnique } from "@/lib/db/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  console.log('(api/user/create)session: ', session);
  if (!session || !session?.user || !session.user.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { name } = await req.json();

  if (!name || !isUserNameUnique(name) || name === session.user.email) {
    return NextResponse.json({ message: 'you cannot use this name' }, { status: 400 });
  }
  
  const newUser = {
    name,
    email: session.user.email,
    posts: [],
    comments: [],
  };
  createUser(newUser);
  console.log('(api/user/create) newUser:', newUser);
  return NextResponse.json({ message: 'User created successfully' }, { status: 200 });
}