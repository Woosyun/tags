import { NextResponse } from "next/server";

export function GET({ params }: { params: { id: string } }) {
  try {
    const objectId = params.id;

    console.log('(api/post/get) objectId:', objectId);
    
    const testContent = {
      title: 'Test',
      description: 'This is a test description',
      lastModified: '2021-10-10',
      user: 'testuser',
      objectId: objectId,
      content: 'This is a test content',
    }
    
    return NextResponse.json({ post: testContent }, { status: 200});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}