'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from './ui/badge'
import { useRouter } from "next/navigation"

const PostCard = ({
  postCard
}: {
  postCard: any
}) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/post/${encodeURIComponent(postCard.objectId)}`);
  }
  
  return (
    <Card className='m-1 cursor-pointer hover:border-black' onClick={handleClick}>
      <CardHeader>
        <CardTitle>{postCard?.title}</CardTitle>
        <CardDescription>{postCard?.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className='flex flex-row gap-2'>
          <span><Badge>{postCard?.user}</Badge></span>
          <span><Badge>{postCard?.lastModified}</Badge></span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostCard