import { NextRequest, NextResponse } from "next/server";
import { PostT } from '@/lib/types';
import { createPost } from "@/lib/db/post";
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user || !session.user.email)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    
  try {
    const { content, tags } = await req.json();
    const title = content.split('\n')[0];

    const newPost: PostT = {
      title: title,
      author: session!.user?.email?.toString() || 'Anonymous',
      content: content,
      lastModified: new Date(Date.now()),
      tags: tags,
    };
    // console.log('(api/post/create) newPost: ', newPost);
    await createPost(newPost);
    return NextResponse.json({message: 'Post created successfully'}, {status: 200});
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}