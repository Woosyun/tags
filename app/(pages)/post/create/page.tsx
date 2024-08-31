'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { MDXEditorMethods } from '@mdxeditor/editor';
import TagBadge from '@/components/TagBadge';
import { checkUserName } from '@/lib/check';

const Editor = dynamic(() => import('@/components/editor/EditorComponent'), { ssr: false })

const Page = () => {
  const searchParams = useSearchParams();
  const paramTags = searchParams.get('tags')?.split(',')!;
  const tags = paramTags.length===1 && paramTags[0]==='' ? [] : paramTags;

  const returnUrl = searchParams.get('returnUrl');

  const [content, setContent] = useState<string>('');
  const editorRef = useRef<MDXEditorMethods>(null);
  const router = useRouter();

  const createPost = async () => {
    const res = await fetch('/api/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        tags,
      }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      alert('Failed to create post: ' + message);
    }

    router.push(returnUrl || '/');
  }

  useEffect(() => {
    checkUserName();
  }, []);

  return (
    <div className='flex flex-col gap-2 p-2 items-center'>
      <div className='flex flex-row'>
        <Button onClick={createPost}>Create Post</Button>
        <Button onClick={() => router.push(returnUrl || '/')}>Cancel</Button>
      </div>
      {tags.map((tag, idx) => <TagBadge key={idx} tag={tag} removeTag={null} />)}
      <div
        onClick={() => editorRef?.current?.focus()}
        className='w-[80vw] h-[80vh] overflow-auto border-2 border-solid border-gray-300'
      >
        <Editor markdown={content} setMarkdown={setContent} editorRef={editorRef}/>
      </div>
    </div>
  );
};

export default Page;
