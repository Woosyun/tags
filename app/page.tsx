'use client'
import PostCard from '@/components/PostCard';
import PaginationComponent from '@/components/PaginationComponent';
import Sidebar from '@/components/Sidebar'
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PostCreator from '@/components/PostCreator';

const testContent = {
  title: 'Test',
  description: 'This is a test description',
  lastModified: '2021-10-10',
  user: 'testuser',
  objectId: '1234',
}
const testContents: any[] = Array.from({length: 10}, () => testContent);

const page = () => {
  const [postCards, setPostCards] = useState(testContents);
  const [tags, setTags] = useState([]);
  const [isPostCreatorOpen, setIsPostCreatorOpen] = useState(false);
  
  return (
    <div className='flex flex-row gap-2 p-2'>
      <Sidebar tags={tags} setTags={setTags} />

      <div className='flex-grow p-2'>
        <div className='flex flex-row'>
          <PaginationComponent />
          <Button onClick={() => setIsPostCreatorOpen(true)}>post</Button>
        </div>
        <ScrollArea className='max-h-[93vh] flex flex-col'>
          {postCards.map((postCard, idx) => (<PostCard postCard={postCard} key={idx} />))}
        </ScrollArea>
      </div>

      <PostCreator
        isPostCreatorOpen={isPostCreatorOpen}
        setIsPostCreatorOpen={setIsPostCreatorOpen}
        tags={tags}
      />
    </div>
  )
}


export default page