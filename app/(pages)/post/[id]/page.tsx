'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CommentT, PostT } from "@/lib/types";
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
  const [comments, setComments] = useState<CommentT[]>([]);
  
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
      alert(message);
      return;
      // throw new Error('(post)->'+message);
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
      alert(message);
      // throw new Error('(post)->'+message);
    }

    setReadOnly(true);
  }
  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/comment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: e.target[0].value,
        id: id,
      }),
    });

    if(!res.ok) {
      const { message } = await res.json();
      alert(message);
      return;
      // throw new Error('(post)->'+message);
    }

    const { comment: commentPrimitive } = await res.json();
    const newComment: CommentT = { ...commentPrimitive, lastModified: new Date(commentPrimitive.lastModified) };
    setComments([...comments, newComment]);
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
    const fetchComments = async () => {
      const res = await fetch('/api/post/get-comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if(!res.ok) {
        const { message } = await res.json();
        throw new Error('(post)->'+message);
      }

      const { comments } = await res.json();
      const newComments = comments.map((comment: CommentT) => ({...comment, lastModified: new Date(comment.lastModified)}));
      setComments(newComments);
    }

    fetchPost();
    fetchComments();
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
        {post.tags.map((tag, i) => (<Badge key={i}>{tag}</Badge>))}

        <Editor readOnly={readOnly} markdown={post.content} setMarkdown={(content: string) => setPost({
          ...post,
          content
        })} />
      </div>

      <div className='mt-10 flex flex-col gap-2'>
        <form
          className='flex flex-row'
          onSubmit={handleCommentSubmit}
        >
          <textarea
            placeholder='write a comment'
            className='flex-grow resize-none'
          />
          <Button type='submit'>submit</Button>
        </form>

        {comments.map((comment, i) => (<Comment key={i} comment={comment} />))}
      </div>
    </div>
  )
}

function Comment({ comment }: {comment: CommentT}) {
  return (
    <div className='border-2 border-solid border-gray-200'>
      <p className='flex flex-row justify-between text-sm'>
        <span className='text-gray-300'>{comment.author}</span>
        <span className='text-gray-300'>{comment.lastModified.toLocaleDateString()}</span>
      </p>
      <p>{comment.content}</p>
    </div>
  )
}