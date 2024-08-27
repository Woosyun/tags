'use client'
import React, { useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from "@/components/ui/badge"

const Sidebar = ({
  tags,
  setTags
}: {
  tags: string[],
  setTags: any
}) => {
  const [newTag, setNewTag] = useState<string>('');
  
  const handleClick = async () => {
    const s = new Set(tags);
    s.add(newTag);
    setTags(Array.from(s));
  }
  
  return (
    <div className='mt-14 w-[250px] h-[600px] border-2 border-solid border-black p-2'>
      <div className='flex flex-row gap-2'>
        <Input type='text' placeholder='Search...' value={newTag} onChange={(e) => setNewTag(e.target.value)} />
        <Button variant="outline" onClick={handleClick}>Add</Button>
      </div>

      <ScrollArea className='mt-2'>
        { tags.map((tag, idx) => (<Badge variant='outline' key={idx}>{tag}</Badge>))}
      </ScrollArea>
    </div>
  )
}

export default Sidebar