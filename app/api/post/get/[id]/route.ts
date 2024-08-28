import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, {params}: {params: {id: string}}) {
  try {
    const id = params.id;

    console.log('(api/post/get) objectId:', id);
    
    const testContent = {
      title: 'Test',
      description: 'This is a test description',
      lastModified: '2021-10-10',
      user: 'testuser',
      objectId: id,
      content: 'This is a test content',
    }
    
    return NextResponse.json({ post: JSON.stringify(testContent) }, { status: 200});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}