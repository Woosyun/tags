import { useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const Searchbar = ({
  addTag
}: {
  addTag: (tag: string) => void
}) => {
  const [tag, setTag] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!tag) return;
    
    addTag(tag);
    setTag('');
  }
  
  return (
    <form onSubmit={handleSubmit} className='flex flex-row gap-4 w-1/2 mx-auto'>
      <Input
        type='search'
        placeholder='search'
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <Button type='submit' variant='outline'>o</Button>
    </form>
  )
}

export default Searchbar