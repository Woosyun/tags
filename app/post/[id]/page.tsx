'use client'
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [post, setPost] = useState<any>(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/post/get/${id}`);
      if (!res.ok) {
        throw new Error('(post) failed to fetch post');
      }
      
      const { post } = await res.json();
      console.log(post);
      setPost(JSON.parse(post));
    }

    fetchPost();
  }, []);

  if (!post) {
    return <div>Loading...</div>
  }
  
  const time = new Date(Date.now());
  const utcTime = time.toISOString();
  const localTime = new Date(utcTime).toLocaleString();
  
  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      <p>{localTime}</p>
    </div>
  )
}