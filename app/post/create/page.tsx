'use client';
import Sidebar from '@/components/Sidebar';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { MDXEditorMethods } from '@mdxeditor/editor';

const Editor = dynamic(() => import('@/components/editor/EditorComponent'), { ssr: false })

const Page = () => {
  const searchParams = useSearchParams();
  const baseTags = searchParams.get('tags')?.split(',') || [];

  const [tags, setTags] = useState<string[]>(baseTags);
  const [content, setContent] = useState('');
  const editorRef = useRef<MDXEditorMethods>(null);

  const handleChange = (e: any) => {
    setContent(e);
  }

  return (
    <div className='flex flex-row gap-10 p-2 items-center'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row justify-between'>
          <Button variant='outline' onClick={() => console.log(content)}>Upload</Button>
          <Button variant='outline'>Cancel</Button>
        </div>
        <Sidebar tags={tags} setTags={setTags} />
      </div>
      <div
        onClick={() => editorRef?.current?.focus()}
        className='mt-10 flex-grow h-[80vh] overflow-auto border-2 border-solid border-gray-300'
      >
        <Editor markdown={content} setMarkdown={handleChange} editorRef={editorRef}/>
      </div>
    </div>
  );
};

export default Page;
