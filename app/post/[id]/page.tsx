'use client'
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

const Editor = dynamic(() => import('@/components/editor/EditorComponent'), { ssr: false })

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const [post, setPost] = useState<any>(null);
  const router = useRouter();
  
  const handleDeletion = async () => {
    const res = await fetch('/api/post/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error('(post)->'+message);
    }

    router.push(returnUrl || '/');
  }
  
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/post/get/${id}`);
      if (!res.ok) {
        throw new Error('(post) failed to fetch post');
      }
      
      const { post } = await res.json();
      setPost(JSON.parse(post));
    }

    fetchPost();
  }, []);

  if (!post) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <Button onClick={handleDeletion}>delete</Button>
      <div
        className='
        max-w-[80vw]
        border-2 border-solid border-gray-300 
        m-10 p-10
        '
      >
        <Editor readOnly markdown={post.content} />
      </div>
    </div>
  )
}