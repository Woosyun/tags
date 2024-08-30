'use client'
import PostCard from '@/components/PostCard';
import PaginationComponent from '@/components/PaginationComponent';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Searchbar from '@/components/Searchbar';
import TagBadge from '@/components/TagBadge';
import { PostCardT } from '@/lib/types';

const page = () => {
  const [postCards, setPostCards] = useState<PostCardT[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState<number>(1);
  
  const handlePostButtonClick = () => {
    const queryString = new URLSearchParams({ tags: tags.join(','), returnUrl: window.location.href }).toString();
    router.push(`/post/create?${queryString}`);
  }
  
  const addTag = (tag: string): void => {
    console.log('add tag: ', tag);
    
    const s = new Set(tags);
    s.add(tag);
    setTags(Array.from(s));
  }
  const removeTag = (tag: string): void => {
    console.log('remove tag: ', tag);
    
    const s = new Set(tags);
    s.delete(tag);
    setTags(Array.from(s));
  }
  
  const fetchPage = async (pageNumber: number, pageSize: number) => {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tags, pageNumber, pageSize }),
    });
    
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error('(home)' + message);
    }

    const { postCards } = await res.json();
    setPostCards(JSON.parse(postCards));
  }

  useEffect(() => {
    fetchPage(pageNumber, 10);
  }, [tags, pageNumber]);
  
  return (
    <div className='flex flex-col gap-2'>
      <Searchbar addTag={addTag} />

      <div className='max-w-[90vw] max-h-[10vh]'>
        {tags.map((tag: string, idx: number) => <TagBadge key={idx} tag={tag} removeTag={removeTag} />)}
      </div>
      
      <ScrollArea className='flex flex-col max-h-[85vh]'>
        {postCards.map((postCard, idx) => (<PostCard postCard={postCard} key={idx} />))}
      </ScrollArea>

      <div className='flex flex-row max-h-[93vh]'>
        <PaginationComponent pageNumber={pageNumber} setPageNumber={setPageNumber} />
        <Button onClick={handlePostButtonClick} variant="outline">post</Button>
      </div>
    </div>
  )
}

export default page