'use client'
import PostCard from '@/components/PostCard';
import PaginationComponent from '@/components/PaginationComponent';
import Sidebar from '@/components/Sidebar'
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import PostCreator from '@/components/PostCreator';
import { useRouter } from 'next/navigation';

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
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();

  const handlePostButtonClick = () => {
    const queryString = new URLSearchParams({ tags: tags.join(',') }).toString();
    router.push(`/post/create?${queryString}`);
  }
  
  useEffect(() => {
    const search = async () => {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags, pageNumber: 1, pageSize: 10 }),
      });
      
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error('(home)' + message);
      }

      const { postCards: postCardsPrimitive } = await res.json();
      const postCardsJSON = JSON.parse(postCardsPrimitive);
      console.log('(home)', postCardsJSON);
      setPostCards(postCardsJSON);
    }

    search();
  }, [tags]);
  
  return (
    <div className='flex flex-row gap-2 p-2'>
      <Sidebar tags={tags} setTags={setTags} />

      <div className='flex-grow p-2'>
        <div className='flex flex-row max-h-[93vh]'>
          <PaginationComponent />
          <Button onClick={handlePostButtonClick}>post</Button>
        </div>
        <ScrollArea>
          {postCards.map((postCard, idx) => (<PostCard postCard={postCard} key={idx} />))}
        </ScrollArea>
      </div>

    </div>
  )
}


export default page