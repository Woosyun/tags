'use client'
import { Button } from "@/components/ui/button";
import { PostT } from "@/lib/types";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

const Editor = dynamic(() => import('@/components/editor/EditorComponent'), { ssr: false })

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const [post, setPost] = useState<PostT | null>(null);
  const router = useRouter();
  const [readOnly, setReadOnly] = useState<boolean>(true);
  
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
  const handleEditButtonClick = async () => {
    if (readOnly) {
      setReadOnly(false);
      return;
    }

    const res = await fetch('/api/post/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, content: post?.content || '' }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error('(post)->'+message);
    }

    setReadOnly(true);
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
    <div className='max-w-[80vw] mx-auto flex flex-col'>
      <div className='flex flex-row justify-between'>
        <Button onClick={handleEditButtonClick} variant='outline'>{readOnly ? 'edit' : 'save'}</Button>
        <Button onClick={handleDeletion} variant='outline'>delete</Button>
      </div>
      
      <div className='mt-10'>
        <Editor readOnly={readOnly} markdown={post.content} setMarkdown={(content: string) => setPost({
          ...post,
          content
        })} />
      </div>
    </div>
  )
}