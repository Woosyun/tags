import { Badge } from "./ui/badge"

const TagBadge = ({
  tag,
  removeTag
}: {
  tag: string,
  removeTag: ((prevTag: string) => void) | null
}) => {
  return (
    <Badge variant='outline'>
      {tag}
      {removeTag && 
        <span
          onClick={() => removeTag(tag)}
          className='ml-2 cursor-pointer text-red-500'
        >
          x
        </span>
      }
    </Badge>
  )
}

export default TagBadge