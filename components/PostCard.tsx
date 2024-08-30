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
import { PostCardT } from "@/lib/types"

const PostCard = ({
  postCard
}: {
  postCard: PostCardT
}) => {
  const router = useRouter();

  const handlePostCardClick = () => {
    const queryString = new URLSearchParams({ returnUrl: window.location.href }).toString();
    router.push(`/post/${encodeURIComponent(postCard._id)}?${queryString}`);
  }

  const date = new Date(postCard?.lastModified);
  
  return (
    <Card className='cursor-pointer hover:bg-gray-100' onClick={handlePostCardClick}>
      <CardHeader>
        <CardTitle>{postCard?.title}</CardTitle>
      </CardHeader>
      <CardFooter>
        <div className='flex flex-row gap-2'>
          <span><Badge variant='outline' className='bg-slate-300'>{postCard?.author}</Badge></span>
          <span><Badge variant='outline' className='bg-slate-200'>{date.toLocaleDateString()}</Badge></span>
          {postCard?.tags.map((tag, idx) => (<Badge key={idx}>{tag}</Badge>))}
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostCard