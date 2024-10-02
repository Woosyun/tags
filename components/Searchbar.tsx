import { useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Search } from "lucide-react";

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
    <form
      onSubmit={handleSubmit}
      className='flex flex-row'>
      <Input
        type='search'
        placeholder='search'
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className='rounded'
      />
      <Button type='submit'><Search /></Button>
    </form>
  )
}

export default Searchbar